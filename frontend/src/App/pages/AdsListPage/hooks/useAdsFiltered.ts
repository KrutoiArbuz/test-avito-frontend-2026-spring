import { useMemo } from 'react';

import type { ItemListItemModel } from '@/types/itemTypes';

import type { AdsFilterStateType } from './useAdsFilterState';

export const useAdsFiltered = (
  items: ItemListItemModel[],
  { search, sort, selectedCategories, filterNeedsRevision }: AdsFilterStateType
): ItemListItemModel[] =>
  useMemo(() => {
    let result = [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((item) => item.title.toLowerCase().includes(q));
    }

    if (selectedCategories.length > 0) {
      result = result.filter((item) => selectedCategories.includes(item.category));
    }

    if (filterNeedsRevision) {
      result = result.filter((item) => item.needsRevision);
    }

    const [col, dir] = sort.split('_');
    result.sort((a, b) => {
      let cmp = 0;
      if (col === 'title') cmp = a.title.localeCompare(b.title, 'ru');
      else if (col === 'price') cmp = a.price - b.price;
      else if (col === 'createdAt') cmp = items.indexOf(a) - items.indexOf(b);
      return dir === 'desc' ? -cmp : cmp;
    });

    return result;
  }, [items, search, sort, selectedCategories, filterNeedsRevision]);
