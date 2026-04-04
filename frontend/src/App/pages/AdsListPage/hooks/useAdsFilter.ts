import type { ItemListItemModel } from '@/types/itemTypes';

import { useAdsFilterState, type AdsFilterStateReturn } from './useAdsFilterState';
import { useAdsFiltered } from './useAdsFiltered';
import { useAdsPagination, type AdsPaginationReturn } from './useAdsPagination';

export type UseAdsFilterReturn = AdsFilterStateReturn &
  AdsPaginationReturn & {
    filtered: ItemListItemModel[];
    paginatedItems: ItemListItemModel[];
    pageCount: number;
  };

export const useAdsFilter = (items: ItemListItemModel[]): UseAdsFilterReturn => {
  const pagination = useAdsPagination();

  const filterState = useAdsFilterState(() => pagination.setPage(1));

  const filtered = useAdsFiltered(items, filterState);

  const pageCount = Math.ceil(filtered.length / pagination.pageSize);
  const paginatedItems = filtered.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  );

  return {
    ...filterState,
    ...pagination,
    filtered,
    paginatedItems,
    pageCount,
  };
};
