import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { filtersFetched, filtersFetching, activeFilterChanged } from "../../actions";
import {useHttp} from '../../hooks/http.hook';

const HeroesFilters = () => {   
    const {filters, filtersLoadingStatus, filteredHeroes} = useSelector(state => state);

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters") 
            .then(data => dispatch(filtersFetched(data)))
            .catch((er) => console.error(er));
        // eslint-disable-next-line
    }, []);

    const renderButtons = (arr) => {      

        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Кнопок пока нет</h5>
        }

        return arr.map((item) => {
            return (<button
                key = {uuidv4()}
                value={item.value}
                onClick={() => dispatch(activeFilterChanged(item.value))}
                className = {item.color}>{item.name}</button>)
        })
    } 

    const elements = renderButtons(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {/* <button className="btn btn-outline-dark active">Все</button>  */}
                    {elements}

                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;