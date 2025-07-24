import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Recipe } from '@/utils/interface';
import { sanitizeTitle } from '@/utils/helpers';

const dataPath = path.join(process.cwd(), 'src', 'data', 'recipes.json');
const uploadDir = path.join(process.cwd(), 'public/images');
fs.mkdirSync(uploadDir, { recursive: true });

function readData(): Recipe[] {
  try {
    const fileData = fs.readFileSync(dataPath, 'utf-8');
    return fileData.trim() ? JSON.parse(fileData) : [];
  } catch (err) {
    console.error('Failed to read or parse data.json:', err);
    return [];
  }
}


function writeData(data: Recipe[]) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const recipes = readData();
    return res.status(200).json(recipes);
  }

  if (req.method === 'POST') {
    const {
      title,
      description,
      name,
      email,
      ingredients,
      instructions,
      image, // can be base64 or empty string
    } = req.body;

    if (!title || !description || !name || !email || !ingredients || !instructions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const recipes = readData();

    // Check for unique title (case-insensitive)
    const titleExists = recipes.some(
      (r) => r.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (titleExists) {
      return res.status(409).json({
        message: 'A recipe with this title already exists',
        code: 'TITLE_NOT_UNIQUE',
        field: 'title',
        hint: 'Title should be unique',
      });
    }

    if(!image) {
      return res.status(400).json({
        message: 'Image is required',
      });
    }

    let imagePath = '';

    // Handle base64 image
    if (typeof image === 'string' && image.startsWith('data:image')) {
      const matches = image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: 'Invalid image format' });
      }

      const ext = matches[1].split('/')[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');

      const safeTitle = sanitizeTitle(title) || uuidv4();
      const filename = `${safeTitle}.${ext}`;
      const filepath = path.join(uploadDir, filename);

      fs.writeFileSync(filepath, buffer);
      imagePath = `/images/${filename}`;
    }

    const newRecipe: Recipe = {
      id: uuidv4(),
      image: imagePath,
      isFavorite: false,
      title,
      description,
      name,
      email,
      ingredients,
      instructions,
      createdAt: new Date().toISOString(),
    };

    recipes.unshift(newRecipe);
    writeData(recipes);

    return res.status(201).json(newRecipe);
  }

  return res.status(405).end(); // Method Not Allowed
}
