import { useState } from 'react';

import type { Layout } from '../components/SearchBar';

const PAGE_SIZE_GRID = 10;
const PAGE_SIZE_LIST = 3;

export type AdsPaginationReturn = {
  page: number;
  layout: Layout;
  pageSize: number;
  setPage: (p: number) => void;
  setLayout: (v: Layout) => void;
};

export const useAdsPagination = (): AdsPaginationReturn => {
  const [page, setPage] = useState(1);
  const [layout, setLayout] = useState<Layout>('grid');

  const pageSize = layout === 'grid' ? PAGE_SIZE_GRID : PAGE_SIZE_LIST;

  return { page, setPage, layout, setLayout, pageSize };
};
