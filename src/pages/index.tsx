import { useDispatch, useSelector } from 'react-redux';
import { Header, Input, Sidebar, RecipeList } from '@/components';
import { RootState } from '@/redux';
import type { SortKey, SortOrder, YesNo } from '@/utils/constants';
import { useFilteredRecipes } from '@/hooks/useFilteredRecipes';

const recipes = [
  {
    id: '1',
    image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg',
    isFavorite: false,
    title: 'Chicken Tinola',
    description: 'Lorem Ipsum...',
    author: 'Mark',
    createdAt: 'March 1, 2024',
  },
  {
    id: '2',
    image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg',
    isFavorite: true,
    title: 'Afritada',
    description: 'Lorem Ipsum...',
    author: 'Johnny',
    createdAt: 'March 5, 2024',
  },
  {
    id: '3',
    image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg',
    isFavorite: false,
    title: 'Caldereta',
    description: 'Lorem Ipsum...',
    author: 'Tony',
    createdAt: 'March 10, 2024',
  },
];

export default function Home() {
  const dispatch = useDispatch();
  const sortState = useSelector((state: RootState) => state.recipes.sort);
  const filter = useSelector((state: RootState) => state.recipes.filter);

  const filteredRecipes = useFilteredRecipes({
    recipes,
    filter: filter as YesNo,
    sortState: sortState as Partial<Record<SortKey, SortOrder>>,
  });

  return (
    <main className="h-screen w-screen flex flex-col bg-[#EBEBEB] overflow-hidden">
      <Header right={<Input />} />
      <div className="flex flex-1 h-0">
        <Sidebar disabled={recipes.length === 0} />
        <RecipeList recipes={filteredRecipes} />
      </div>
    </main>
  );
}