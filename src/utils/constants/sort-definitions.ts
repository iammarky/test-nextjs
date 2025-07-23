export const sortOptions = [
  { label: 'ASC', value: 'asc' },
  { label: 'DESC', value: 'desc' },
] as const;

export const filterOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
] as const;

export const sortConfig = [
  { key: 'title', label: 'Sort by Title' },
  { key: 'author', label: 'Sort by Author' },
  { key: 'date', label: 'Sort by Date' },
] as const;

export type SortKey = typeof sortConfig[number]['key'];
export type SortOrder = 'asc' | 'desc' | '';
export type YesNo = 'yes' | 'no' | '';
