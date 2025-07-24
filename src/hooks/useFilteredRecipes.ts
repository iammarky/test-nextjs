import { useMemo } from 'react';
import { sortConfig, type SortKey, type SortOrder, type YesNo } from '@/utils/constants';
import { compareValues, getValue } from '@/utils/helpers';
import type { Recipe } from '@/utils/interface';

type Props = {
  recipes: Recipe[];
  filter: YesNo;
  sortState: Partial<Record<SortKey, SortOrder>>;
  searchTerm?: string;
};

export function useFilteredRecipes({ recipes, filter, sortState, searchTerm = '' }: Props) {
  return useMemo(() => {
    let result = [...recipes];

    // Apply filter
    if (filter) {
      result = result.filter((r) => (filter === 'yes' ? r.isFavorite : !r.isFavorite));
    }

    // Apply search
    if (searchTerm.trim()) {
      const lower = searchTerm.trim().toLowerCase();
      result = result.filter((r) =>
        r.title.toLowerCase().includes(lower) ||
        r.name.toLowerCase().includes(lower)
      );
    }

    // Apply sort
    const activeSort = sortConfig.find(({ key }) => sortState[key]);
    if (activeSort) {
      const { key } = activeSort;
      const dir = sortState[key];

      if (dir === 'asc' || dir === 'desc') {
        result.sort((a, b) =>
          compareValues(getValue(a, key), getValue(b, key), dir)
        );
      }
    }

    return result;
  }, [recipes, filter, sortState, searchTerm]);
}
