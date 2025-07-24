// pages/api/recipe/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Recipe } from '@/utils/interface';
import { sanitizeTitle } from '@/utils/helpers';

const dataPath = path.join(process.cwd(), 'src/data/recipes.json');
const uploadDir = path.join(process.cwd(), 'public/images');
fs.mkdirSync(uploadDir, { recursive: true });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as Recipe[];
  const writeData = (data: Recipe[]) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  switch (req.method) {
    case 'GET': {
      const recipes = readData();
      const recipe = recipes.find(r => r.id === id);

      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      return res.status(200).json(recipe);
    }

    case 'PUT': {
      const {
        title,
        description,
        name,
        email,
        image, // could be base64 or a URL
        isFavorite,
        ingredients,
        instructions,
      } = req.body;

      const recipes = readData();
      const index = recipes.findIndex(r => r.id === id);

      if (index === -1) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      let imagePath = recipes[index].image ?? '';

      // Handle base64 image (new image upload)
      if (typeof image === 'string' && image.startsWith('data:image')) {
        const matches = image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
        if (!matches) {
          return res.status(400).json({ error: 'Invalid image format' });
        }

        const ext = matches[1].split('/')[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, 'base64');

        const safeTitle = sanitizeTitle(title || recipes[index].title) || uuidv4();
        const filename = `${safeTitle}-${Date.now()}.${ext}`;
        const filepath = path.join(uploadDir, filename);

        fs.writeFileSync(filepath, buffer);
        imagePath = `/images/${filename}`;
      } else if (typeof image === 'string' && image.startsWith('/images/')) {
        // keep existing URL-based path
        imagePath = image;
      }

      const updated: Recipe = {
        ...recipes[index],
        ...(title && { title }),
        ...(description && { description }),
        ...(name && { name }),
        ...(email && { email }),
        ...(typeof isFavorite === 'boolean' && { isFavorite }),
        ...(ingredients && { ingredients }),
        ...(instructions && { instructions }),
        image: imagePath,
        updatedAt: new Date().toISOString(),
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
