import { createReducer } from "@reduxjs/toolkit"

import {
    heroesFetched,
    heroesFetching,
    heroesFetchingError,
    heroDeleted
} from '../actions'; 

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle', 
}

const heroes = createReducer(initialState, builder => {
    builder 
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error'
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addDefaultCase(() => {})
});

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle',
//                 filteredHeroes: state.activeFilter === 'all' ? 
//                     action.payload : 
//                     action.payload.filter(item => item.element === state.activeFilter)
//             }
//         case 'HEROES_FETCHING_ERROR':   
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_DELETED': 
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload) 
//             }
        
//         default: return state
//     }
// }

export default heroes;