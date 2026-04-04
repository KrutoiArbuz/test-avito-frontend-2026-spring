import { useState } from 'react';

import type { CategoryType } from '@/types/itemTypes';

export type AdsFilterStateType = {
  search: string;
  sort: string;
  selectedCategories: CategoryType[];
  filterNeedsRevision: boolean;
};

export type AdsFilterStateReturn = AdsFilterStateType & {
  setSearch: (v: string) => void;
  setSort: (v: string) => void;
  setSelectedCategories: (cats: CategoryType[]) => void;
  setFilterNeedsRevision: (v: boolean) => void;
  resetFilters: () => void;
};

export const useAdsFilterState = (onFilterChange?: () => void): AdsFilterStateReturn => {
  const [search, setSearchRaw] = useState('');
  const [sort, setSortRaw] = useState('createdAt_desc');
  const [selectedCategories, setSelectedCategoriesRaw] = useState<CategoryType[]>([]);
  const [filterNeedsRevision, setFilterNeedsRevisionRaw] = useState(false);

  const notify = () => onFilterChange?.();

  const setSearch = (v: string) => {
    setSearchRaw(v);
    notify();
  };
  const setSort = (v: string) => {
    setSortRaw(v);
    notify();
  };
  const setSelectedCategories = (cats: CategoryType[]) => {
    setSelectedCategoriesRaw(cats);
    notify();
  };
  const setFilterNeedsRevision = (v: boolean) => {
    setFilterNeedsRevisionRaw(v);
    notify();
  };
  const resetFilters = () => {
    setSelectedCategoriesRaw([]);
    setFilterNeedsRevisionRaw(false);
    notify();
  };

  return {
    search,
    sort,
    selectedCategories,
    filterNeedsRevision,
    setSearch,
    setSort,
    setSelectedCategories,
    setFilterNeedsRevision,
    resetFilters,
  };
};
