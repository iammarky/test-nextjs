// src/utils/schema/recipeSchema.ts
import { z } from 'zod';

export const recipeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  ingredients: z.string().min(1, 'Ingredients are required'),
  instructions: z.string().min(1, 'Instructions are required'),
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;
