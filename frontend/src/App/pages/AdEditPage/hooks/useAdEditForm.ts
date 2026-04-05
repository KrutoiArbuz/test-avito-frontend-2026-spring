import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAiRequest } from '@/hooks/useAiRequest';
import { useEditDraftStore } from '@/stores/editFormStore';
import {
  DEFAULT_FORM_VALUES,
  editFormSchema,
  type FormValues,
  formToApiData,
} from '@/types/formTypes';
import type { CategoryType, ItemUpdateInApi } from '@/types/itemTypes';
import { buildDescriptionPrompt, buildPricePrompt } from '@/utils/aiPrompts';

export const useAdEditForm = (id: string, onSave: (data: ItemUpdateInApi) => void) => {
  const storedValues = useEditDraftStore((s) => s.drafts[id] ?? DEFAULT_FORM_VALUES);
  const setStoreValues = useEditDraftStore((s) => s.setValues);

  const [values, setLocalValues] = useState<FormValues>(storedValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [categoryTouched, setCategoryTouched] = useState<Record<string, boolean>>({});

  const hasUserEdited = useRef(false);
  useEffect(() => {
    if (!hasUserEdited.current) {
      setLocalValues(storedValues);
    }
  }, [storedValues]);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const set = useCallback(
    <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
      hasUserEdited.current = true;

      setLocalValues((prev) => ({ ...prev, [field]: value }));
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        setStoreValues(id, { [field]: value });
      }, 400);
    },
    [id, setStoreValues]
  );

  const parsed = useMemo(() => editFormSchema.safeParse(values), [values]);
  const isValid = parsed.success;

  const fieldError = (field: string): string | undefined => {
    if (!parsed.success) {
      return parsed.error.issues.find((i) => i.path[0] === field)?.message;
    }
  };

  const titleError = touched.title ? fieldError('title') : undefined;
  const priceError = touched.price ? fieldError('price') : undefined;

  const handleCategoryChange = useCallback(
    (val: string) => {
      hasUserEdited.current = true;
      const next: FormValues = { ...values, category: val as CategoryType, params: {} };
      setLocalValues(next);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      setStoreValues(id, next);
      setCategoryTouched({});
    },
    [id, setStoreValues, values]
  );

  const handleCategoryFieldChange = (field: string, value: string) => {
    set('params', { ...values.params, [field]: value });
    setCategoryTouched((prev) => ({ ...prev, [field]: true }));
  };

  const descAi = useAiRequest();
  const priceAi = useAiRequest();

  const getItemContext = () => ({
    title: values.title,
    category: values.category,
    params: values.params,
    description: values.description,
  });

  const handleDescAi = (e: React.MouseEvent<HTMLButtonElement>) =>
    descAi.run(buildDescriptionPrompt(getItemContext()), e.currentTarget);

  const handlePriceAi = (e: React.MouseEvent<HTMLButtonElement>) =>
    priceAi.run(buildPricePrompt(getItemContext()), e.currentTarget);

  const handleApplyDesc = () => {
    set('description', descAi.result);
    descAi.closePopover();
  };

  const handleApplyPrice = () => {
    const match = priceAi.result.match(/(\d[\d\s]*\d)\s*[₽р]?/);
    if (match) set('price', match[1].replace(/\s/g, ''));
    priceAi.closePopover();
  };

  const handleSave = useCallback(() => {
    setTouched({ title: true, price: true, category: true });
    if (!parsed.success) return;
    clearTimeout(debounceRef.current);
    setStoreValues(id, values);
    onSave(formToApiData(parsed.data));
  }, [parsed, id, setStoreValues, values, onSave]);

  return {
    values,
    touched,
    categoryTouched,
    set,
    isValid,
    titleError,
    priceError,
    descAi,
    priceAi,
    handleCategoryChange,
    handleCategoryFieldChange,
    handleDescAi,
    handlePriceAi,
    handleApplyDesc,
    handleApplyPrice,
    handleSave,
  };
};
