import { useSearchParams } from 'react-router';

import type { LayoutType } from '@/types/layoutType';

export function useLayoutParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const layout = (searchParams.get('layout') || 'grid') as LayoutType;

  const setLayout = (newLayout: LayoutType) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newLayout !== 'grid') next.set('layout', newLayout);
      else next.delete('layout');
      return next;
    });
  };

  return [layout, setLayout] as const;
}
