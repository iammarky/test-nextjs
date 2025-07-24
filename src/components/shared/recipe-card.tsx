import React, { useState } from 'react';
import Image from 'next/image';
import { usePatchFavoriteMutation } from '@/redux';

type RecipeCardProps = {
  id: string;
  image: string;
  isFavorite: boolean;
  title: string;
  description: string;
  name: string;
  createdAt: string;
};

export default function RecipeCard({
  id,
  image,
  isFavorite,
  title,
  description,
  name,
  createdAt,
}: RecipeCardProps) {
  const [patchFavorite] = usePatchFavoriteMutation();
  const [imgSrc, setImgSrc] = useState(image || '/svgs/image.svg');

  const toggleFavorite = () => {
    patchFavorite({ id, isFavorite: !isFavorite });
  };

  return (
    <div className="p-5 border-b border-[#435490]">
      <div className="flex h-[223px] w-full overflow-hidden rounded-[15px] border border-black bg-white shadow-md">
        {/* Left image section */}
        <div className="relative w-[310px] h-full">
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 310px"
            className="object-cover rounded-l-[15px]"
            onError={() => setImgSrc('/svgs/image.svg')}
            priority
          />
          <Image
            src={isFavorite ? '/svgs/star-filled.svg' : '/svgs/star.svg'}
            alt="Favorite"
            width={29}
            height={29}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleFavorite();
            }}
            className="absolute top-2 right-2 cursor-pointer"
            priority
          />
        </div>

        {/* Right content section */}
        <div className="flex flex-1 flex-col justify-between p-4 space-y-2">
          <div>
            <h2 className="text-[32px] font-semibold">{title}</h2>
            <p className="text-[15px] font-semibold line-clamp-4 max-w-[90%]">
              {description}
            </p>
          </div>

          <div className="space-y-2">
            {id && (
              <p className="cursor-pointer text-[12px] font-semibold">
                See more
              </p>
            )}
            <div className="flex justify-between text-[15px] font-semibold">
              {name && <span>Added by: {name}</span>}
              {createdAt && <span>Date: {createdAt}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
