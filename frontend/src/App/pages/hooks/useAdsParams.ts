import { useSearchParams } from 'react-router';

import { useCategoriesParams } from '@/hooks/params/useCategoriesParams';
import { useLayoutParams } from '@/hooks/params/useLayoutParams';
import { useNeedsRevisionParams } from '@/hooks/params/useNeedsRevisionParams';
import { usePageParams } from '@/hooks/params/usePageParams';
import { useSearchProductsParams } from '@/hooks/params/useSearchProductsParams';
import { useSortParams } from '@/hooks/params/useSortParams';

export function useAdsParams() {
  const [search, setSearch] = useSearchProductsParams();
  const [page, setPage] = usePageParams();
  const [selectedCategories, setSelectedCategories] = useCategoriesParams();
  const [sort, setSort] = useSortParams();
  const [layout, setLayout] = useLayoutParams();
  const [filterNeedsRevision, setFilterNeedsRevision] = useNeedsRevisionParams();

  const [, setSearchParams] = useSearchParams();

  const resetFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams();
      if (prev.has('layout')) next.set('layout', prev.get('layout')!);
      return next;
    });
  };

  return {
    search,
    setSearch,
    page,
    setPage,
    selectedCategories,
    setSelectedCategories,
    sort,
    setSort,
    layout,
    setLayout,
    filterNeedsRevision,
    setFilterNeedsRevision,
    resetFilters,
  };
}
