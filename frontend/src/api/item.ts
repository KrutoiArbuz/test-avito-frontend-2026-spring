import { apiClient } from '@/config/api';
import type { ItemApi, ItemsGetOutApi, ItemsQueryParamsApi } from '@/types/itemTypes';

export const getItems = async (
  { q, limit, skip, needsRevision, categories, sortColumn, sortDirection }: ItemsQueryParamsApi,
  signal?: AbortSignal
) => {
  const params = new URLSearchParams();

  if (q) params.set('q', q);
  if (limit !== undefined) params.set('limit', limit.toString());
  if (skip !== undefined) params.set('skip', skip.toString());
  if (needsRevision !== undefined) params.set('needsRevision', needsRevision.toString());
  if (categories) params.set('categories', categories);
  if (sortColumn) params.set('sortColumn', sortColumn);
  if (sortDirection) params.set('sortDirection', sortDirection);

  const response = await apiClient.get<ItemsGetOutApi>('/items', { params, signal });

  return response.data;
};

export const getItem = async (id: string, signal?: AbortSignal) => {
  const response = await apiClient.get<ItemApi>(`/items/${id}`, { signal });
  return response.data;
};
