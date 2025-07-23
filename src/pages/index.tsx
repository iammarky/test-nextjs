import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Input, RecipeCard, Dropdown, ToggleOptions } from '@/components';
import { RootState, setSort, setFilter, clearFilter, clearSort } from '@/redux';
import { filterOptions, sortOptions, sortConfig, type SortKey, type SortOrder, type YesNo } from '@/utils/constants';
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

  const hasActiveSort = useMemo(
    () => Object.values(sortState).some(Boolean),
    [sortState]
  );

  const filteredRecipes = useFilteredRecipes({
    recipes,
    filter: filter as YesNo,
    sortState: sortState as Partial<Record<SortKey, SortOrder>>,
  });

  return (
    <main className="h-screen w-screen flex flex-col bg-[#EBEBEB] overflow-hidden">
      <Header right={<Input />} />
      <div className="flex flex-1 h-0">
        {/* Sidebar */}
        <aside
          className={`w-[500px] p-8 space-y-6 transition-opacity duration-200 ${
            recipes.length === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {sortConfig.map(({ key, label }, index) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-[21px] font-semibold">{label}</p>
                {index === 0 && hasActiveSort && (
                  <button
                    className="text-blue-500 text-sm underline"
                    onClick={() => dispatch(clearSort())}
                  >
                    Clear Sort
                  </button>
                )}
              </div>
              <Dropdown
                value={sortState[key]}
                onChange={(val) =>
                  dispatch(setSort({ key, order: val as SortOrder }))
                }
                options={sortOptions}
                placeholder="Select"
              />
            </div>
          ))}

          {/* Filter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-[21px] font-semibold">Filter</p>
              {filter && (
                <p
                  className="cursor-pointer text-blue-500 text-sm"
                  onClick={() => dispatch(clearFilter())}
                >
                  Clear Filter
                </p>
              )}
            </div>
            <div className="border border-black rounded-md p-4 bg-white space-y-4">
              <p className="text-[16px] font-semibold text-[#616161]">Favorites?</p>
              <ToggleOptions
                value={filter}
                onChange={(val) => dispatch(setFilter(val as YesNo))}
                options={filterOptions}
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="relative flex-1 w-full p-8">
          <img
            src="/plus.svg"
            alt="Add recipe"
            className="absolute top-12 right-12 w-[71px] h-[71px] z-10 cursor-pointer"
          />
          <div className="bg-white rounded-[10px] h-full p-5 shadow-md">
            {filteredRecipes.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-[49px] font-semibold text-center">No Record Found!</p>
              </div>
            ) : (
              <div className="h-full overflow-auto hide-scrollbar space-y-4 pr-1">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} {...recipe} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}