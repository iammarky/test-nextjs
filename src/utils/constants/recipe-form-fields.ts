import type { RecipeFormValues } from '@/utils/schema';

export const recipeTextFields: {
  label: string;
  name: keyof RecipeFormValues;
  placeholder: string;
}[] = [
  { label: 'Your Name', name: 'name', placeholder: 'Name' },
  { label: 'Email Address', name: 'email', placeholder: 'Email address' },
  { label: 'Title', name: 'title', placeholder: 'Title' },
];

export const recipeTextAreas: {
  label: string;
  name: keyof RecipeFormValues;
  placeholder: string;
  height: number;
}[] = [
  { label: 'Description', name: 'description', placeholder: 'Description here', height: 75 },
  { label: 'Ingredients', name: 'ingredients', placeholder: 'Ingredients here', height: 135 },
  { label: 'Instructions', name: 'instructions', placeholder: 'Instructions here', height: 135 },
];
