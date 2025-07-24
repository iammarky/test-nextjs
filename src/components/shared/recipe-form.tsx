import { useRouter } from 'next/router';
import { TextField, TextArea } from '@/components';
import { UseFormRegister, FieldErrors, SubmitHandler } from 'react-hook-form';
import { RecipeFormValues } from '@/utils/schema';
import { recipeTextFields, recipeTextAreas  } from '@/utils/constants';

interface RecipeFormProps {
  register: UseFormRegister<RecipeFormValues>;
  errors: FieldErrors<RecipeFormValues>;
  handleSubmit: (onSubmit: SubmitHandler<RecipeFormValues>) => (e?: React.BaseSyntheticEvent) => void;
  onSubmit: SubmitHandler<RecipeFormValues>;
  onDelete: () => void; 
}

export default function RecipeForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
  onDelete
}: RecipeFormProps) {
  const router = useRouter();
  const isCreateMode = router.query.id === 'create';
  return (
    <section className="relative flex-1 w-full p-8">
      <div className="h-full p-5 overflow-auto hide-scrollbar">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {recipeTextFields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              {...register(field.name as keyof RecipeFormValues)}
              errorMessage={errors[field.name as keyof RecipeFormValues]?.message}
              validation={errors[field.name as keyof RecipeFormValues] ? 'error' : undefined}
            />
          ))}

          {recipeTextAreas.map((field) => (
            <TextArea
              key={field.name}
              label={field.label}
              placeholder={`${field.label} here`}
              height={field.height}
              resizable
              {...register(field.name as keyof RecipeFormValues)}
              errorMessage={errors[field.name as keyof RecipeFormValues]?.message}
              validation={errors[field.name as keyof RecipeFormValues] ? 'error' : undefined}
            />
          ))}

          <div className="flex justify-end space-x-2">
            {!isCreateMode && (
              <button
                type="button"
                className="px-[24px] h-[36px] bg-[#EE6400] text-white rounded-[4px]"
                onClick={onDelete}
              >
                Delete
              </button>
            )}
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
  );
}
