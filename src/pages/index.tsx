import { Header, Input, RecipeCard } from '@/components'

const recipes = [
  {
    id: '1',
    image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg',
    isFavorite: false,
    title: 'Title',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typeseLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typeseLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typese",
    author: 'Johnny',
    createdAt: 'March 6, 2024',
  },
  {
    id: '2',
    image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg',
    isFavorite: true,
    title: 'Title',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typeseLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typeseLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typese",
    author: 'Johnny',
    createdAt: 'March 6, 2024',
  },
  {
    id: '3',
    image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg',
    isFavorite: false,
    title: 'Title',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typeseLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typeseLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typese",
    author: 'Johnny',
    createdAt: 'March 6, 2024',
  },
];

export default function Home() {
  return (
    <>
      <main className='h-screen w-screen flex flex-col bg-[#EBEBEB] overflow-hidden'>
        <Header right={<Input />}/>
        <div className='flex flex-1 h-0'>
          {/* Sidebar (Sort + Filter) */}
          <aside className="w-[500px] p-8 bg-red-500">
            
          </aside>

          {/* Content (Recipe List) */}
          <section className="relative flex-1 w-full p-8">
              <img 
                src="/plus.svg" 
                alt="add icon" 
                className="absolute top-12 right-12 w-[71px] h-[71px] z-10 cursor-pointer"
              />
            <div className="bg-white rounded-[10px] h-full p-5 overflow-auto shadow-md hide-scrollbar">
              {recipes.map((recipe, idx) => (
                <RecipeCard {...recipe} key={recipe.id}/>
              ))}
            </div>
          </section>
        </div>  
      </main>
    </>
  )
}
