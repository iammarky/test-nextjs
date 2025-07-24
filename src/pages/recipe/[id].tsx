import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema, RecipeFormValues } from '@/utils/schema';
import { Header, TextField, TextArea, RecipeForm } from '@/components';
import { useGetRecipeByIdQuery } from '@/redux';

export default function Recipe() {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  
  const { data: recipe, isLoading, error } = useGetRecipeByIdQuery(id!, { skip: !id });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: recipe?.author ?? '',
      email: recipe?.email ?? '',
      title: recipe?.title ?? '',
      description: recipe?.description ?? '',
      ingredients: recipe?.ingredients ?? '',
      instructions: recipe?.instructions ?? '',
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipe</div>;
  if (!recipe) return <div>Recipe not found</div>;

  const onSubmit = (data: RecipeFormValues) => {
    console.log(data);
  };

  return (
    <main className="h-screen w-screen flex flex-col bg-[#EBEBEB] overflow-hidden">
      <Header />
      <div className="flex flex-1 h-0">
        <aside className="w-[500px] p-8 space-y-6 transition-opacity duration-200">
          <div className="space-y-2">
            <div className="flex space-x-1 items-center cursor-pointer" onClick={() => router.push('/')}>
              <img src="/chevron-left.svg" alt="back" className="w-[26px] h-[26px]" />
              <p className="text-[36px] font-[400]">Back</p>
            </div>
            <img
              src={recipe.image || '/image.svg'}
              alt="preview"
              className="w-[457px] h-[401px] object-cover rounded"
            />
          </div>
        </aside>
        <RecipeForm
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </div>
    </main>
  );
}
