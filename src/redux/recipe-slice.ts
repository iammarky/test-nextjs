import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  sort: {
    title: '',
    date: '',
    author: '',
  },
  filter: '',
};

type SortOrder = 'asc' | 'desc' | '';
type YesNo = 'yes' | 'no' | '';

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSort: ( state, action: PayloadAction<{ key: 'title' | 'date' | 'author'; order: SortOrder }> ) => {
      state.sort = { title: '', date: '', author: '' };
      state.sort[action.payload.key] = action.payload.order;
    },
    clearSort: (state) => {
      state.sort = { title: '', date: '', author: '' };
    },
    setFilter: (state, action: PayloadAction<YesNo>) => {
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = '';
    },
  },
});

export const { setSort, clearSort, setFilter, clearFilter } = recipeSlice.actions;
export default recipeSlice.reducer;
