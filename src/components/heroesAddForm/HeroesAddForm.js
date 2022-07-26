// import { useState, useEffect } from "react";

import { useHttp } from "../../hooks/http.hook";
import { heroesFetched, heroesFetching, heroesFetchingError } from "../../actions";

import { useSelector, useDispatch } from "react-redux";
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
    const {heroes} = useSelector(state => state);
    const {request} = useHttp();
    const dispatch = useDispatch();


    return (
        <Formik initialValues={{
            id: '',
            name: '',
            description: '',
            element: ''
        }}

        onSubmit = { values => {
            let char = JSON.stringify(values, null, 2);
            values.id = uuidv4();

            dispatch(heroesFetching())
            request( "http://localhost:3001/heroes", 'POST', char )
                .then(() => dispatch(heroesFetched([...heroes, values])))
                .catch(() => dispatch(heroesFetchingError()));                
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
                        <option >Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option>
                    </Field>
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;