import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema, RecipeFormValues } from '@/utils/schema';
import { Header, RecipeForm } from '@/components';
import { useGetRecipeByIdQuery, useDeleteRecipeMutation } from '@/redux';

export default function Recipe() {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  
  const { data: recipe, isLoading, error } = useGetRecipeByIdQuery(id!, { skip: !id });
  const [deleteRecipe] = useDeleteRecipeMutation();

  const {
    register,
    handleSubmit,
    reset,
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

  useEffect(() => {
    if (recipe) {
      reset({
        name: recipe.author ?? '',
        email: recipe.email ?? '',
        title: recipe.title ?? '',
        description: recipe.description ?? '',
        ingredients: recipe.ingredients ?? '',
        instructions: recipe.instructions ?? '',
      });
    }
  }, [recipe, reset]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipe</div>;
  if (!recipe) return <div>Recipe not found</div>;

  const onSubmit = (data: RecipeFormValues) => {
    console.log(data);
  };

  const onDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm('Are you sure you want to delete this recipe?');
    if (!confirmed) return;

    try {
      await deleteRecipe(id).unwrap();
      router.push('/');
    } catch (err) {
      console.error('Failed to delete recipe:', err);
      alert('Failed to delete the recipe.');
    }
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
          onDelete={onDelete}
        />
      </div>
    </main>
  );
}
