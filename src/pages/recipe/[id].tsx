// src/pages/recipe/[id].tsx
import { useRouter } from 'next/router';

export default function Recipe() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Recipe Page</h1>
      <p className="mt-4 text-lg">Recipe ID: {id}</p>
    </div>
  );
}
