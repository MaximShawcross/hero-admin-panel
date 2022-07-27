const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',  
    deleteHero: {},      
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                filteredHeroes: state.activeFilter === 'all' ? 
                    action.payload : 
                    action.payload.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_FETCHING_ERROR':   
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING': 
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            };
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'HERO_DELETED': 
            const newHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes: state.activeFilter === 'all' ? 
                    newHeroList : 
                    newHeroList.filter(item => item.element === state.activeFilter)
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ? 
                    state.heroes :
                    state.heroes.filter(item => item.element === action.payload)
            }
        case 'FILTERED_HERO': 
            const heroes = state.heroes;
            return {
                ...state,
                filteredHeroes: state.activeFilter === 'all' ? 
                heroes : 
                heroes.filter(item => item.element === state.activeFilter)
            }
        default: return state
    }
}

export default reducer;