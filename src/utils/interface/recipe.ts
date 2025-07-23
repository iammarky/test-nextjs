interface Recipe {
  id: string;
  image: string;
  isFavorite: boolean;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  [key: string]: any;
};

export type {
  Recipe
}