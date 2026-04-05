import type { SortOptionType } from '@/types/sortOptionType';

export const SORT_OPTIONS: SortOptionType[] = [
  { value: 'createdAt_desc', label: 'По новизне (сначала новые)' },
  { value: 'createdAt_asc', label: 'По новизне (сначала старые)' },
  { value: 'price_asc', label: 'По цене (дешевле)' },
  { value: 'price_desc', label: 'По цене (дороже)' },
  { value: 'title_asc', label: 'По названию (А → Я)' },
  { value: 'title_desc', label: 'По названию (Я → А)' },
];
