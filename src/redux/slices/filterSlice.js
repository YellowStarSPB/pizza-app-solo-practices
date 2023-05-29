import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    sortPosition: false,
    currentPage: 1,
    sortType: {
        name: 'популярности',
        sortProp: 'rating',
    },
};

const filterSlice = createSlice({
    name: '@@filter',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        setSortPosition: (state) => {
            state.sortPosition = !state.sortPosition;
        },
        setSortType: (state, action) => {
            state.sortType = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const filterReducer = filterSlice.reducer;
export const { setCategoryId, setSortType, setSortPosition, setCurrentPage } =
    filterSlice.actions;
