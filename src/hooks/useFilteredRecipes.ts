import { useMemo } from 'react';
import { sortConfig, type SortOrder, type YesNo, type SortKey } from '@/utils/constants';
import { getValue, compareValues } from '@/utils/helpers';

type Recipe = {
  id: string;
  image: string;
  isFavorite: boolean;
  title: string;
  description: string;
  author: string;
  createdAt: string;
};

type UseFilteredRecipesProps = {
  recipes: Recipe[];
  filter: YesNo;
  sortState: Partial<Record<SortKey, SortOrder>>;
};

export function useFilteredRecipes({ recipes, filter, sortState }: UseFilteredRecipesProps) {
  return useMemo(() => {
    let result = [...recipes];

    if (filter) {
      result = result.filter(r =>
        filter === 'yes' ? r.isFavorite : !r.isFavorite
      );
    }

    const active = sortConfig.find(({ key }) => sortState[key]);
    if (active) {
      const { key } = active;
      const dir = sortState[key]!;
      result.sort((a, b) => compareValues(getValue(a, key), getValue(b, key), dir));
    }

    return result;
  }, [recipes, filter, sortState]);
}
