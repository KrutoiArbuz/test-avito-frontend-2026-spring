import { create } from 'zustand';

import type { CategoryType } from '@/types/itemTypes';

export type Layout = 'grid' | 'list';

export const PAGE_SIZE: Record<Layout, number> = {
  grid: 10,
  list: 3,
};

type AdsState = {
  search: string;
  sort: string;
  selectedCategories: CategoryType[];
  filterNeedsRevision: boolean;
  layout: Layout;
  page: number;
};

type AdsActions = {
  setSearch: (v: string) => void;
  setSort: (v: string) => void;
  setSelectedCategories: (cats: CategoryType[]) => void;
  setFilterNeedsRevision: (v: boolean) => void;
  setLayout: (v: Layout) => void;
  setPage: (p: number) => void;
  resetFilters: () => void;
};

const INITIAL_STATE: AdsState = {
  search: '',
  sort: 'createdAt_desc',
  selectedCategories: [],
  filterNeedsRevision: false,
  layout: 'grid',
  page: 1,
};

export const useAdsStore = create<AdsState & AdsActions>((set) => ({
  ...INITIAL_STATE,

  setSearch: (search) => set({ search, page: 1 }),
  setSort: (sort) => set({ sort, page: 1 }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories, page: 1 }),
  setFilterNeedsRevision: (filterNeedsRevision) => set({ filterNeedsRevision, page: 1 }),
  setLayout: (layout) => set({ layout, page: 1 }),
  setPage: (page) => set({ page }),

  resetFilters: () =>
    set({
      search: INITIAL_STATE.search,
      sort: INITIAL_STATE.sort,
      selectedCategories: INITIAL_STATE.selectedCategories,
      filterNeedsRevision: INITIAL_STATE.filterNeedsRevision,
      page: 1,
    }),
}));
