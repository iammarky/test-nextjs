// src/pages/recipe/[id].tsx
import { useRouter } from 'next/router';
import { Header, TextField, TextArea } from '@/components';
import { useGetRecipeByIdQuery } from '@/redux'

export default function Recipe() {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
   const { data: recipe, isLoading, error } = useGetRecipeByIdQuery(id!, {
    skip: !id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipe</div>;

  return (
    <main className="h-screen w-screen flex flex-col bg-[#EBEBEB] overflow-hidden">
      <Header/>
      <div className="flex flex-1 h-0">
        <aside  className="w-[500px] p-8 space-y-6 transition-opacity duration-200">
          <div className="space-y-2">
            <div className='flex space-x-1 items-center cursor-pointer' onClick={() => router.push('/')}>
              <img src="/chevron-left.svg" alt="chevron-down" className="w-[26px] h-[26px]" />
              <p className='text-[36px] font-[400]'>Back</p>
            </div>
            <img src="/image.svg" alt="chevron-down" className="w-[457px] h-[401px]" />
          </div>
        </aside>
        <section className="relative flex-1 w-full p-8">
          <div className="h-full p-5 space-y-4 overflow-auto hide-scrollbar">
            <TextField
              label="YOUR NAME"
              type="name"
              placeholder="Name"
            />
            <TextField
              label="EMAIL address"
              type="email_address"
              placeholder="Email address"
            />
            <TextField
              label="Title"
              type="title"
              placeholder="Title"
            />
            <TextArea
              label="Description"
              placeholder="Description here"
              resizable
              height={75}
            />
            <TextArea
              label="Ingredients"
              placeholder="Ingredients here"
              resizable
              height={135}
            />
            <TextArea
              label="Instructions"
              placeholder="Instructions here"
              resizable
              height={135}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
