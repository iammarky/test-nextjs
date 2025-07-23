import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Recipe } from '@/utils/interface';

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Recipe'],
  endpoints: (builder) => ({
    getRecipes: builder.query<Recipe[], void>({
      query: () => 'recipes',
      providesTags: ['Recipe'],
    }),
    addRecipe: builder.mutation<Recipe, FormData>({
      query: (formData) => ({
        url: 'recipes',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Recipe'],
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
        url: `recipe/${id}`,
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
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  usePatchFavoriteMutation,
  useDeleteRecipeMutation,
} = recipeApi;
