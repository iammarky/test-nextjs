import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema, RecipeFormValues } from '@/utils/schema';
import { Header, RecipeForm } from '@/components';
import Image from 'next/image';
import { useGetRecipeByIdQuery, useDeleteRecipeMutation, useUpdateRecipeMutation, useAddRecipeMutation } from '@/redux';

export default function Recipe() {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  
  const { data: recipe, error } = useGetRecipeByIdQuery(id!, { skip: !id || id === 'create' });
  const [deleteRecipe] = useDeleteRecipeMutation();
  const [addRecipe] = useAddRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: recipe?.name ?? '',
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
        name: recipe.name ?? '',
        email: recipe.email ?? '',
        title: recipe.title ?? '',
        description: recipe.description ?? '',
        ingredients: recipe.ingredients ?? '',
        instructions: recipe.instructions ?? '',
      });
    }
  }, [recipe, reset]);

  if (error) return <div>Error loading recipe</div>;

  const onSubmit = async (data: RecipeFormValues) => {
    if(!id || id === 'create') {
      console.log(data)
      try {
        await addRecipe(data).unwrap();
        alert('Recipe created successfully');
        router.push('/');
      } catch (error) {
        console.error('Failed to create recipe:', error);
        alert('Failed to create the recipe.');
      }
    } else {
      try {
        await updateRecipe({ id, updates: data }).unwrap();
        alert('Recipe updated successfully');
        router.push('/');
      } catch (error) {
        console.error('Failed to update recipe:', error);
        alert('Failed to update the recipe.');
      }
    }
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
            <Image
              src={recipe?.image || '/image.svg'}
              alt="preview"
              width={457}
              height={401}
              className="object-cover rounded w-[457px] h-[401px]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/image.svg';
              }}
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
