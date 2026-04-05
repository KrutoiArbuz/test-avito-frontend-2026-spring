import { useSearchParams } from 'react-router';

export function useSearchProductsParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  const setSearch = (newSearch: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newSearch.trim()) next.set('search', newSearch);
      else next.delete('search');

      next.set('page', '1');
      return next;
    });
  };

  return [search, setSearch] as const;
}
