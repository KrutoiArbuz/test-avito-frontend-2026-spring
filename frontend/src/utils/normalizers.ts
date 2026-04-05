import type { CategoryType } from '@/types/itemTypes';

export const CATEGORY_LABELS: Record<CategoryType, string> = {
  auto: 'Транспорт',
  electronics: 'Электроника',
  real_estate: 'Недвижимость',
};

export const getCategoryLabel = (category: CategoryType): string => CATEGORY_LABELS[category];
