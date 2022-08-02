import { createSlice, createAsyncThunk , createEntityAdapter} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
// const initialState = {    
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all',
// }

const filterAdapter = createEntityAdapter();

const initialState = filterAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
})

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request }= useHttp();
        return request('http://localhost:3001/filters');
    }
)

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetchingError: (state) => { state.filtersLoadingStatus = 'error'},
        filtersFetching: (state) => { state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, action) => {
            filterAdapter.setAll(state, action.payload);
            state.filtersLoadingStatus = 'idle'
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = 'loading';
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filterAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error'
            })
            .addDefaultCase(() => {});
    }
})

const {actions, reducer} = filterSlice;

export default reducer;

export const { selectAll } = filterAdapter.getSelectors(state => state.filters)

export const {
    filtersFetchingError,
    filtersFetching,
    filtersFetched,
    activeFilterChanged
} = actions 