import { useState } from 'react';
import { Header, Input, RecipeCard, Dropdown, ToggleOptions } from '@/components';

type YesNo = typeof options[number]['value'];
type SortOrder = typeof sortOptions[number]['value'];

const recipes = [
  {
    id: '1',
    image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg',
    isFavorite: false,
    title: 'Title',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...',
    author: 'Johnny',
    createdAt: 'March 6, 2024',
  },
  {
    id: '2',
    image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg',
    isFavorite: true,
    title: 'Title',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...',
    author: 'Johnny',
    createdAt: 'March 6, 2024',
  },
  {
    id: '3',
    image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg',
    isFavorite: false,
    title: 'Title',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...',
    author: 'Johnny',
    createdAt: 'March 6, 2024',
  },
];

const sortOptions = [
  { label: 'ASC', value: 'asc' },
  { label: 'DESC', value: 'desc' },
] as const;

const options = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
] as const;


export default function Home() {
  const [sort, setSort] = useState<SortOrder | ''>('');
  const [value, setValue] = useState<YesNo | ''>('');

  return (
    <main className="h-screen w-screen flex flex-col bg-[#EBEBEB] overflow-hidden">
      <Header right={<Input />} />
      <div className="flex flex-1 h-0">
        {/* Sidebar */}
        <aside className={`w-[500px] p-8 space-y-10 transition-opacity duration-200 ${recipes.length === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="space-y-2">
            <p className="text-[21px] font-semibold">Sort by Title</p>
            <Dropdown
              value={sort}
              onChange={setSort}
              options={sortOptions}
              placeholder="Select"
            />
          </div>
          <div className="space-y-2">
            <p className="text-[21px] font-semibold">Filter</p>
            <div className="border border-black rounded-md p-4 bg-white space-y-4">
              <p className="text-[16px] font-semibold text-[#616161]">Favorites?</p>
              <ToggleOptions
                value={value}
                onChange={setValue}
                options={options}
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="relative flex-1 w-full p-8">
          {/* Floating Add Button */}
          <img
            src="/plus.svg"
            alt="Add recipe"
            aria-label="Add recipe"
            className="absolute top-12 right-12 w-[71px] h-[71px] z-10 cursor-pointer"
          />

          <div className="bg-white rounded-[10px] h-full p-5 shadow-md">
            {recipes.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-[49px] font-semibold text-center">No Record Found!</p>
              </div>
            ) : (
              <div className="h-full overflow-auto hide-scrollbar space-y-4 pr-1">
                {recipes.map((recipe) => (
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
