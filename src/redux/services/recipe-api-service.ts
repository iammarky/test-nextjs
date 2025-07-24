import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Recipe } from '@/utils/interface';
import type { RecipeFormValues } from '@/utils/schema';

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Recipe'],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => 'recipes',
      providesTags: ['Recipe'],
    }),
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => `recipes/${id}`,
      providesTags: ['Recipe'],
    }),
    addRecipe: builder.mutation<Recipe, RecipeFormValues>({
      query: (data) => ({
        url: 'recipes',
        method: 'POST',
        body: data,
      }),
    }),
    updateRecipe: builder.mutation<Recipe, { id: string; updates: Partial<Recipe> }>({
      query: ({ id, updates }) => ({
        url: `recipes/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Recipe'],
    }),
    patchFavorite: builder.mutation<Recipe, { id: string; isFavorite: boolean }>({
      query: ({ id, isFavorite }) => ({
        url: `recipes/${id}`,
        method: 'PATCH',
        body: { isFavorite },
      }),
      invalidatesTags: ['Recipe'],
    }),
    deleteRecipe: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipe'],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  usePatchFavoriteMutation,
  useDeleteRecipeMutation,
} = recipeApi;
