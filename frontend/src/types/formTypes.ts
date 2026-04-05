import { z } from 'zod/v4';

import type { CategoryType, ItemModel, ItemParamsApi, ItemUpdateInApi } from '@/types/itemTypes';

export const editFormSchema = z.object({
  category: z.enum(['auto', 'real_estate', 'electronics']),
  title: z.string().min(1, 'Название обязательно'),
  price: z
    .string()
    .min(1, 'Цена обязательна')
    .refine((v) => Number(v) > 0, { message: 'Цена должна быть больше 0' }),
  description: z.string().max(1000, 'Максимум 1000 символов').default(''),
  imageUrl: z.string().default(''),
  params: z.record(z.string(), z.string()).default({}),
});

export type FormValues = z.infer<typeof editFormSchema>;

export const DEFAULT_FORM_VALUES: FormValues = {
  category: 'electronics',
  title: '',
  price: '',
  description: '',
  imageUrl: '',
  params: {},
};

export const itemToFormValues = (item: ItemModel): FormValues => ({
  category: item.category,
  title: item.title,
  price: String(item.price),
  description: item.description ?? '',
  imageUrl: item.imageUrl ?? '',
  params: Object.fromEntries(
    Object.entries(item.params ?? {}).map(([k, v]) => [k, v != null ? String(v) : ''])
  ),
});

const NUMERIC_PARAMS: Record<CategoryType, string[]> = {
  auto: ['yearOfManufacture', 'mileage', 'enginePower'],
  real_estate: ['area', 'floor'],
  electronics: [],
};

export const formToApiData = (values: FormValues): ItemUpdateInApi => ({
  category: values.category,
  title: values.title.trim(),
  price: Number(values.price),
  description: values.description?.trim() || undefined,
  params: Object.fromEntries(
    Object.entries(values.params)
      .filter(([, v]) => v.trim())
      .map(([k, v]) => [k, NUMERIC_PARAMS[values.category].includes(k) ? Number(v) : v])
  ) as ItemParamsApi,
});
