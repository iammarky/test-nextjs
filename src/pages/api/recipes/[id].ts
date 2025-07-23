// pages/api/recipe/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Recipe } from '@/utils/interface';

const dataPath = path.join(process.cwd(), 'src/data/recipes.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as Recipe[];
  const writeData = (data: Recipe[]) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  switch (req.method) {
    case 'PUT': {
      const { title, description, author, image, isFavorite } = req.body;
      const recipes = readData();
      const index = recipes.findIndex(r => r.id === id);

      if (index === -1) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      const updated = {
        ...recipes[index],
        ...(title && { title }),
        ...(description && { description }),
        ...(author && { author }),
        ...(image && { image }),
        ...(typeof isFavorite === 'boolean' && { isFavorite }),
      };

      recipes[index] = updated;
      writeData(recipes);
      return res.status(200).json(updated);
    }

    case 'PATCH': {
      const { isFavorite } = req.body;
      const recipes = readData();
      const index = recipes.findIndex(r => r.id === id);

      if (index === -1) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      if (typeof isFavorite !== 'boolean') {
        return res.status(400).json({ error: 'isFavorite must be a boolean' });
      }

      recipes[index].isFavorite = isFavorite;
      writeData(recipes);
      return res.status(200).json(recipes[index]);
    }

    case 'DELETE': {
      const recipes = readData();
      const newRecipes = recipes.filter(r => r.id !== id);

      if (newRecipes.length === recipes.length) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      writeData(newRecipes);
      return res.status(200).json({ success: true });
    }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
