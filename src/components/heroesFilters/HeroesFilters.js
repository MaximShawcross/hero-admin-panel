import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
// import { useDispatch } from "react-redux";

// import { heroesFetchingError, heroesFetched, heroesFetching } from "../../actions";
import {useHttp} from '../../hooks/http.hook';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {   
    // const {heroes} = useSelector(state)
    // const [heroList, setHeroList] = useState(null);
    const [filters, setFilters] = useState( [] );
    
    // const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        request("http://localhost:3001/filters") 
            .then(item => setFilters(item))
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
                id ="buton"
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
                     {/* <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}

                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;