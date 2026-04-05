import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getItem } from '@/api/item';
import { normalizeItem } from '@/utils/normalizers';

export const useItemQuery = (id: string) =>
  useQuery({
    queryKey: ['items', id],
    enabled: !!id,
    queryFn: ({ signal }) => getItem(id, signal),
    placeholderData: keepPreviousData,
    select: (data) => normalizeItem(data),
  });
