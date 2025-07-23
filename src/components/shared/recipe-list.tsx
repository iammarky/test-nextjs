import { RecipeCard } from '@/components';
import { type Recipe } from '@/utils/interface';
import Link from 'next/link';

const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <section className="relative flex-1 w-full p-8">
      <img
        src="/plus.svg"
        alt="Add recipe"
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
              <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
                <RecipeCard {...recipe} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipeList 