import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_FORM_VALUES, itemToFormValues, type FormValues } from '@/types/formTypes';
import type { ItemModel } from '@/types/itemTypes';

type EditDraftState = {
  drafts: Record<string, FormValues>;

  initDraft: (id: string, item: ItemModel) => void;

  setValues: (id: string, patch: Partial<FormValues>) => void;

  clearDraft: (id: string) => void;
};

export const useEditDraftStore = create<EditDraftState>()(
  persist(
    (set) => ({
      drafts: {},

      initDraft: (id, item) =>
        set((state) => ({
          drafts: {
            ...state.drafts,
            [id]: state.drafts[id] ?? itemToFormValues(item),
          },
        })),

      setValues: (id, patch) =>
        set((state) => ({
          drafts: {
            ...state.drafts,
            [id]: { ...(state.drafts[id] ?? DEFAULT_FORM_VALUES), ...patch },
          },
        })),

      clearDraft: (id) =>
        set((state) => {
          const { [id]: _, ...rest } = state.drafts;
          return { drafts: rest };
        }),
    }),
    {
      name: 'edit-form-drafts',
    }
  )
);
