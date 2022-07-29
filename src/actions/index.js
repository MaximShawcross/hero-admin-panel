import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));

}
export const fetchFilters = (request) => dispatch => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters") 
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()));
}

export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }
export const heroesFetched = createAction('HEROES_FETCHED')

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }
export const heroDeleted = createAction('HERO_DELETED');

// export const heroDeleted = (id) => {
//     return {
//         type: 'HERO_DELETED',
//         payload: id
//     }
// }


export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}


export const activeFilterChanged = (filter) =>  {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}

// export const activeFilterChanged = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: filter
//         })
//     }, 2000)
// }

