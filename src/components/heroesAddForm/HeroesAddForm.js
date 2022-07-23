import { useState, useEffect } from "react";

import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { heroesFetched, heroesFetching, heroesFetchingError } from "../../actions";


import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from 'uuid';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => { 
    const [options, setOptins] = useState( [] );
    const [optionsLoading, setOptinsLoading] = useState(true);

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(item => setOptins(item))
            .then(setOptinsLoading(false));
    // eslint-disable-next-line
    }, []);

    // let loadedOptions = onOptionsLoading();

    const renderOptions = (option) => {
        if (optionsLoading === true) return <option >Подождите пару секунд...</option>
        
        else {
            for(let i =0; i <5; i++) {
                return <option value={option[i]}>{option[i]}</option>
            }
        }
    }

    const content = renderOptions(options);

    return (
        <Formik initialValues={{
            id: 15,
            name: '',
            description: '',
            element: ''
        }}

        onSubmit = { values => {
            dispatch(heroesFetching());
            let char = JSON.stringify(values, null, 2);
            request("http://localhost:3001/heroes", 'POST', char);
        }}>
            <Form className="border p-4 shadow-lg rounded" >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        required
                        name="description" 
                        className="form-control" 
                        id="description" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}
                        as = "textarea"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        required
                        className="form-select" 
                        id="element" 
                        name="element"
                        as = "select">
                        {content}   
                        
                        {/* <option >Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option> */}
                    </Field>
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;