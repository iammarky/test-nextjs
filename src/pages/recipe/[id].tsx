import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { recipeSchema, RecipeFormValues } from '@/utils/schema';
import { Header, RecipeForm } from '@/components';
import {
  useGetRecipeByIdQuery,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
  useAddRecipeMutation,
} from '@/redux';
import { getImgSrc } from '@/utils/helpers';

export default function Recipe() {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;

  const { data: recipe, error } = useGetRecipeByIdQuery(id!, { skip: !id || id === 'create' });
  const [deleteRecipe] = useDeleteRecipeMutation();
  const [addRecipe] = useAddRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState('/svgs/image.svg');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
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
  
  // Reset form + image preview on load
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

      if (recipe.image && typeof recipe.image === 'string') {
        setImgSrc(recipe.image);
      }
    }
  }, [recipe, reset]);

  // Watch for file changes and generate preview
  const selectedImage = watch('image');

  useEffect(() => {
    if (selectedImage instanceof File) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImgSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // cleanup
    } else if (typeof selectedImage === 'string') {
      setImgSrc(selectedImage || '/svgs/image.svg');
    } else {
      setImgSrc('/svgs/image.svg');
    }
  }, [selectedImage]);

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
    const isCreateMode = !id || id === 'create';

    try {
      if (isCreateMode) {
        await addRecipe(payload).unwrap();
        toast.success('Recipe added successfully!');
      } else {
        await updateRecipe({ id, updates: payload }).unwrap();
        toast.success('Recipe updated successfully!');
      }

      router.push('/');
    } catch (err: any) {
      const field = err?.data?.field as keyof RecipeFormValues | undefined;
      const hint = err?.data?.hint;

      if (field && hint) {
        setError(field, { type: 'manual', message: hint });
      }

      toast.error(err?.data?.message);
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
        <aside className="w-[500px] py-8 pl-8 space-y-6 transition-opacity duration-200">
          <div className="space-y-2">
            <div
              className="flex space-x-1 items-center cursor-pointer"
              onClick={() => router.push('/')}
            >
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
            <img
              suppressHydrationWarning
              src={getImgSrc(imgSrc)}
              alt="preview"
              className="object-cover w-[457px] h-[401px] rounded-[15px] cursor-pointer"
              onClick={handleImageClick}
              onError={() => setImgSrc('/svgs/image.svg')}
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
