import { useSearchParams } from 'react-router';

export function useSortParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'createdAt_desc';

  const setSort = (newSort: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newSort !== 'createdAt_desc') next.set('sort', newSort);
      else next.delete('sort');
      next.set('page', '1');
      return next;
    });
  };

  return [sort, setSort] as const;
}
