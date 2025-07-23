import React from 'react';

type RecipeCardProps = {
  id: string;
  image: string;
  isFavorite: boolean;
  title: string;
  description: string;
  author: string;
  createdAt: string;
};

export default function RecipeCard({
  id,
  image,
  isFavorite,
  title,
  description,
  author,
  createdAt,
}: RecipeCardProps) {
  return (
    <div className='p-5 border-b border-[#435490]'>
      <div className="flex h-[223px] w-full overflow-hidden rounded-[15px] border border-black bg-white shadow-md">
        {/* Left image section */}
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="h-full w-[310px] object-cover"
          />
          <img
            src={isFavorite ? '/star-filled.svg' : '/star.svg'}
            alt="Favorite"
            className="absolute top-2 right-2 w-[29px] h-[29px] cursor-pointer"
          />
        </div>

        {/* Right content section */}
        <div className="flex flex-1 flex-col justify-between p-4 space-y-2">
          {/* Title and description */}
          <div>
            <h2 className="text-[32px] font-semibold">{title}</h2>
            <p className="text-[15px] font-semibold line-clamp-4 max-w-[90%]">
              {description}
            </p>
          </div>

          {/* Footer */}
          <div className="space-y-2">
            {id && (
              <p className="cursor-pointer text-[12px] font-semibold">
                See more
              </p>
            )}
            <div className="flex justify-between text-[15px] font-semibold">
              {author && (
                <span>Added by: {author}</span>
              )}
              {createdAt && (
                <span>Date: {createdAt}</span>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
