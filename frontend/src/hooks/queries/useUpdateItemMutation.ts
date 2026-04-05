import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateItem } from '@/api/item';
import type { ItemUpdateInApi } from '@/types/itemTypes';

export const useUpdateItemMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ItemUpdateInApi) => updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', id] });
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};
