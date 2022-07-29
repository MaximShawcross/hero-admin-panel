import { createSlice } from "@reduxjs/toolkit";

const initialState = {    
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetchingError: (state) => { state.filtersLoadingStatus = 'error'},
        filtersFetching: (state) => { state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle'
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload
        }
    }
})

const {actions, reducer} = filterSlice;

export default reducer;

export const {
    filtersFetchingError,
    filtersFetching,
    filtersFetched,
    activeFilterChanged
} = actions