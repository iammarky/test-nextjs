import { useDispatch, useSelector } from 'react-redux';
import { Header, Input, Sidebar, RecipeList } from '@/components';
import { RootState, setSearch } from '@/redux/slices';
import type { SortKey, SortOrder, YesNo } from '@/utils/constants';
import { useFilteredRecipes } from '@/hooks/useFilteredRecipes';
import {useGetRecipesQuery} from '@/redux'

export default function Home() {
  const dispatch = useDispatch();
  const sortState = useSelector((state: RootState) => state.recipes.sort);
  const filter = useSelector((state: RootState) => state.recipes.filter);
  const search = useSelector((state: RootState) => state.recipes.search);
  const { data: recipes = [] } = useGetRecipesQuery();

  const filteredRecipes = useFilteredRecipes({
    recipes,
    filter: filter as YesNo,
    sortState: sortState as Partial<Record<SortKey, SortOrder>>,
    searchTerm: search,
  });

  return (
    <main className="h-screen w-screen flex flex-col bg-[#EBEBEB] overflow-hidden">
      <Header right={
        <Input
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search here..."
        />
      }/>
      <div className="flex flex-1 h-0">
        <Sidebar disabled={recipes.length === 0} />
        <RecipeList recipes={filteredRecipes} />
      </div>
    </main>
  );
}