# 🥗 Test Next.js Recipe App

A simple recipe management app built with **Next.js**, **TypeScript**, and **Redux Toolkit**. Users can view, create, edit, and delete recipes. Images are uploaded and stored in the public folder, and data is saved locally in a JSON file.

## 🚀 Features

- ✅ View a list of recipes
- ➕ Create a new recipe with image upload
- ✏️ Edit existing recipes
- ❌ Delete recipes
- 🔍 Filter and sort by title or favorite
- ⭐ Mark recipes as favorite

## 📦 Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit + RTK Query](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)

## 🧑‍🍳 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/iammarky/test-nextjs.git
cd test-nextjs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
.
├── app/                  # App router pages
├── components/           # Reusable UI components
│   ├── core/
│   └── shared/
├── public/images/        # Uploaded recipe images
├── redux/                # Redux Toolkit setup
│   ├── services/
│   └── slices/
├── src/data/             # Local JSON database
│   └── recipes.json
├── styles/               # Global styles
│   └── globals.css
├── utils/                # Schema, types, and helpers
│   ├── constants/
│   ├── helpers/
│   ├── interface/
│   └── schema/
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
```

## 📝 API Routes

All API logic is handled under `/pages/api/recipes`:

- `GET /api/recipes` - fetch all recipes
- `POST /api/recipes` - create a recipe
- `PATCH /api/recipes/:id` - update a recipe
* `PATCH /api/recipes/:id` - mark or unmarked recipe as favorite
- `DELETE /api/recipes/:id` - delete a recipe

## 📌 Notes

- Uploaded images are saved to `public/images` and must be manually cleaned if needed.
- Data is stored in `src/data/recipes.json`.