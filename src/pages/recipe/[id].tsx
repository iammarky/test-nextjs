import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema, RecipeFormValues } from '@/utils/schema';
import { Header, RecipeForm } from '@/components';
import Image from 'next/image';
import {
  useGetRecipeByIdQuery,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
  useAddRecipeMutation,
} from '@/redux';

export default function Recipe() {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;

  const { data: recipe, error } = useGetRecipeByIdQuery(id!, { skip: !id || id === 'create' });
  const [deleteRecipe] = useDeleteRecipeMutation();
  const [addRecipe] = useAddRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      email: '',
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      image: '',
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
        image: recipe.image ?? '',
      });
    }
  }, [recipe, reset]);

  const selectedImage = watch('image');
  const imageUrl =
    typeof selectedImage === 'string'
      ? selectedImage
      : selectedImage instanceof File
      ? URL.createObjectURL(selectedImage)
      : '/svgs/image.svg';

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setValue('image', file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: RecipeFormValues) => {
    const payload: any = {
      name: data.name,
      email: data.email,
      title: data.title,
      description: data.description,
      ingredients: data.ingredients,
      instructions: data.instructions,
    };

    if (data.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        payload.image = reader.result;
        await submitRecipe(payload);
      };
      reader.readAsDataURL(data.image);
    } else {
      payload.image = data.image;
      await submitRecipe(payload);
    }
  };

  const submitRecipe = async (payload: any) => {
    try {
      if (!id || id === 'create') {
        await addRecipe(payload).unwrap();
        alert('Recipe created!');
      } else {
        await updateRecipe({ id, updates: payload }).unwrap();
        alert('Recipe updated!');
      }
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Failed to save recipe');
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

  if (error) return <div>Error loading recipe</div>;

  return (
    <main className="h-screen w-screen flex flex-col bg-[#EBEBEB] overflow-hidden">
      <Header />
      <div className="flex flex-1 h-0">
        <aside className="w-[500px] p-8 space-y-6 transition-opacity duration-200">
          <div className="space-y-2">
            <div className="flex space-x-1 items-center cursor-pointer" onClick={() => router.push('/')}>
              <img src="/svgs/chevron-left.svg" alt="back" className="w-[26px] h-[26px]" />
              <p className="text-[36px] font-[400]">Back</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <Image
              src={imageUrl}
              alt="preview"
              width={457}
              height={401}
              className="object-cover rounded w-[457px] h-[401px] cursor-pointer"
              onClick={handleImageClick}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/svgs/image.svg';
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
