import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { fetchFilters, activeFilterChanged, selectAll } from "./filtersSlice";

const HeroesFilters = () => {   
    const filters = useSelector(selectAll);
    // const filters = selectAll(store.getState())

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFilters());
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