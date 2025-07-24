import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(process.cwd(), 'src', 'data', 'recipes.json');

function readData() {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const recipes = readData();
    res.status(200).json(recipes);
  } else if (req.method === 'POST') {
    const {
      title,
      description,
      author,
      email,
      ingredients,
      instructions,
    } = req.body;

    if (!title || !description || !author || !email || !ingredients || !instructions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newRecipe = {
      id: uuidv4(),
      image: '', // Placeholder, can be updated later
      isFavorite: false,
      title,
      description,
      author,
      email,
      ingredients,
      instructions,
      createdAt: new Date().toISOString(),
    };

    const recipes = readData();
    recipes.push(newRecipe);
    writeData(recipes);

    res.status(201).json(newRecipe);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
