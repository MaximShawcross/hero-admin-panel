import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const heroAdapter = createEntityAdapter(); //    main entity

const initialState = heroAdapter.getInitialState({ //   state of main entity
        heroesLoadingStatus: 'idle' 

});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request}= useHttp()
        return request("http://localhost:3001/heroes")
    }
);

const heroesSlice = createSlice({
    name: 'heroes', 
    initialState, 
    reducers: {
        heroDeleted: (state, action) => {
            heroAdapter.removeOne(state, action.payload);
        },
        heroCreated: (state, action) => {
            heroAdapter.addOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state =>  {
                state.heroesLoadingStatus = 'loading'
            }) 
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroAdapter.setAll(state, action.payload) // here was state.heroes = action.payload
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error'
            })
            .addDefaultCase(() => {});  
    }
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const { selectAll } = heroAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector = createSelector(
    selectAll,
    (state) => state.filters.activeFilter, 
    (heroes, filter) => { //first fucntion result and second function result
        if (filter === 'all') {
            console.log('render');
            return heroes;
        } else {
            return heroes.filter(item => item.element === filter);
        }
    }
);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDeleted,
    heroCreated
} = actions;