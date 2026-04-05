import { useSearchParams } from 'react-router';

import type { CategoryType } from '@/types/itemTypes';

export function useCategoriesParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('categories');
  const categories = param ? (param.split(',') as CategoryType[]) : [];

  const setCategories = (newCategories: CategoryType[]) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newCategories.length > 0) next.set('categories', newCategories.join(','));
      else next.delete('categories');

      next.set('page', '1');
      return next;
    });
  };

  return [categories, setCategories] as const;
}
