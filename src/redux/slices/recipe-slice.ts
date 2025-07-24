import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RecipesState = {
  sort: Partial<Record<'title' | 'name' | 'date', 'asc' | 'desc'>>;
  filter: 'yes' | 'no' | '';
  search: string;
};

const initialState: RecipesState = {
  sort: {},
  filter: '',
  search: '',
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<{ key: keyof RecipesState['sort']; order: 'asc' | 'desc' | '' }>) => {
      const { key, order } = action.payload;
      state.sort = {};  // Clear all previous sort keys
      
      if (order) {
        state.sort[key] = order;
      } else {
        delete state.sort[key];
      }
    },
    setFilter: (state, action: PayloadAction<RecipesState['filter']>) => {
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = '';
    },
    clearSort: (state) => {
      state.sort = {};
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    clearSearch: (state) => {
      state.search = '';
    },
  },
});

export const {
  setSort,
  clearSort,
  setFilter,
  clearFilter,
  setSearch,
  clearSearch,
} = recipesSlice.actions;

export default recipesSlice.reducer;
