import type { SortKey, SortOrder } from '../constants';

export const getValue = (item: Record<string, any>, key: SortKey) =>
  key === 'date' ? new Date(item.createdAt).getTime() : item[key];

export const compareValues = (a: any, b: any, dir: SortOrder) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return dir === 'asc' ? a - b : b - a;
  }
  return dir === 'asc'
    ? String(a).localeCompare(String(b))
    : String(b).localeCompare(String(a));
};
