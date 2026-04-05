import { useSearchParams } from 'react-router';

export function usePageParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newPage > 1) next.set('page', String(newPage));
      else next.delete('page');
      return next;
    });
  };

  return [page, setPage] as const;
}
