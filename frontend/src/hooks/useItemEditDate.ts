import { useMemo } from 'react';

const EDIT_DATE_PREFIX = 'item-edit-date-';

export const useItemEditDate = (itemId: string) => {
  const editDate = useMemo(() => {
    if (!itemId) return null;
    const key = `${EDIT_DATE_PREFIX}${itemId}`;
    return localStorage.getItem(key);
  }, [itemId]);

  const updateEditDate = () => {
    const key = `${EDIT_DATE_PREFIX}${itemId}`;
    const now = new Date().toISOString();
    localStorage.setItem(key, now);
  };

  return { editDate, updateEditDate };
};
