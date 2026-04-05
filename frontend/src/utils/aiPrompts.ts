import type { CategoryType } from '@/types/itemTypes';
import { CATEGORY_LABELS } from '@/utils/normalizers';

type ItemContext = {
  title: string;
  category: CategoryType;
  params: Record<string, string>;
  description?: string;
};

const formatParams = (params: Record<string, string>): string =>
  Object.entries(params)
    .filter(([, v]) => v?.trim())
    .map(([k, v]) => `  ${k}: ${v}`)
    .join('\n');

export const buildDescriptionPrompt = (ctx: ItemContext): string => {
  const paramBlock = formatParams(ctx.params);
  const categoryLabel = CATEGORY_LABELS[ctx.category] ?? ctx.category;

  return [
    'Ты помощник для продавцов на Авито. Напиши продающее описание объявления на русском языке.',
    '',
    `Категория: ${categoryLabel}`,
    `Название: ${ctx.title}`,
    paramBlock ? `Характеристики:\n${paramBlock}` : null,
    ctx.description ? `Текущее описание: ${ctx.description}` : null,
    '',
    'Напиши краткое продающее описание (100–200 слов).',
    'Отвечай ТОЛЬКО текстом описания, без вводных фраз и комментариев.',
  ]
    .filter((line) => line !== null)
    .join('\n');
};

export const buildPricePrompt = (ctx: ItemContext): string => {
  const paramBlock = formatParams(ctx.params);
  const categoryLabel = CATEGORY_LABELS[ctx.category] ?? ctx.category;

  return [
    'Ты помощник для продавцов на Авито. Оцени рыночную стоимость товара на российском рынке.',
    '',
    `Категория: ${categoryLabel}`,
    `Название: ${ctx.title}`,
    paramBlock ? `Характеристики:\n${paramBlock}` : null,
    '',
    'Укажи диапазон актуальных цен в рублях (2–4 строки).',
    'Только цены и краткое пояснение, без лишних слов.',
  ]
    .filter((line) => line !== null)
    .join('\n');
};
