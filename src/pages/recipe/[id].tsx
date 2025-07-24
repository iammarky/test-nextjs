import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema, RecipeFormValues } from '@/utils/schema';
import { Header, TextField, TextArea } from '@/components';
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

        <section className="relative flex-1 w-full p-8">
          <div className="h-full p-5 overflow-auto hide-scrollbar">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <TextField
                label="YOUR NAME"
                placeholder="Name"
                {...register('name')}
                errorMessage={errors.name?.message}
                validation={errors.name ? 'error' : undefined}
              />
              <TextField
                label="EMAIL address"
                placeholder="Email address"
                {...register('email')}
                errorMessage={errors.email?.message}
                validation={errors.email ? 'error' : undefined}
              />
              <TextField
                label="Title"
                placeholder="Title"
                {...register('title')}
                errorMessage={errors.title?.message}
                validation={errors.title ? 'error' : undefined}
              />
              <TextArea
                label="Description"
                placeholder="Description here"
                height={75}
                resizable
                {...register('description')}
                errorMessage={errors.description?.message}
                validation={errors.description ? 'error' : undefined}
              />
              <TextArea
                label="Ingredients"
                placeholder="Ingredients here"
                height={135}
                resizable
                {...register('ingredients')}
                errorMessage={errors.ingredients?.message}
                validation={errors.ingredients ? 'error' : undefined}
              />
              <TextArea
                label="Instructions"
                placeholder="Instructions here"
                height={135}
                resizable
                {...register('instructions')}
                errorMessage={errors.instructions?.message}
                validation={errors.instructions ? 'error' : undefined}
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-[24px] h-[36px] bg-[#EE6400] text-white rounded-[4px]"
                  onClick={() => console.log('Delete clicked')}
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="px-[24px] h-[36px] bg-[#435490] text-white rounded-[4px]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
