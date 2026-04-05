import { useSearchParams } from 'react-router';

export function useNeedsRevisionParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const needsRevision = searchParams.get('needsRevision') === 'true';

  const setNeedsRevision = (val: boolean) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val) next.set('needsRevision', 'true');
      else next.delete('needsRevision');

      next.set('page', '1');
      return next;
    });
  };

  return [needsRevision, setNeedsRevision] as const;
}
