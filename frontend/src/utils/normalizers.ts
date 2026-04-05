import type {
  AutoItemParamsApi,
  CategoryType,
  ElectronicsItemParamsApi,
  ItemApi,
  ItemModel,
  RealEstateItemParamsApi,
} from '@/types/itemTypes';

export const CATEGORY_LABELS: Record<CategoryType, string> = {
  auto: 'Транспорт',
  electronics: 'Электроника',
  real_estate: 'Недвижимость',
};

export const getCategoryLabel = (category: CategoryType): string => CATEGORY_LABELS[category];

const AUTO_FIELD_LABELS: Record<keyof AutoItemParamsApi, string> = {
  brand: 'Марка',
  model: 'Модель',
  yearOfManufacture: 'Год выпуска',
  transmission: 'Тип коробки передач',
  mileage: 'Пробег',
  enginePower: 'Мощность двигателя',
};

const REAL_ESTATE_FIELD_LABELS: Record<keyof RealEstateItemParamsApi, string> = {
  type: 'Тип жилья',
  address: 'Адрес',
  area: 'Площадь',
  floor: 'Этаж',
};

const ELECTRONICS_FIELD_LABELS: Record<keyof ElectronicsItemParamsApi, string> = {
  type: 'Тип устройства',
  brand: 'Бренд',
  model: 'Модель',
  condition: 'Состояние',
  color: 'Цвет',
};

function getMissingParamFields(item: ItemApi): string[] {
  const { category, params } = item;

  if (category === 'auto') {
    return (Object.keys(AUTO_FIELD_LABELS) as (keyof AutoItemParamsApi)[])
      .filter((key) => (params as AutoItemParamsApi)[key] == null)
      .map((key) => AUTO_FIELD_LABELS[key]);
  }

  if (category === 'real_estate') {
    return (Object.keys(REAL_ESTATE_FIELD_LABELS) as (keyof RealEstateItemParamsApi)[])
      .filter((key) => (params as RealEstateItemParamsApi)[key] == null)
      .map((key) => REAL_ESTATE_FIELD_LABELS[key]);
  }

  if (category === 'electronics') {
    return (Object.keys(ELECTRONICS_FIELD_LABELS) as (keyof ElectronicsItemParamsApi)[])
      .filter((key) => (params as ElectronicsItemParamsApi)[key] == null)
      .map((key) => ELECTRONICS_FIELD_LABELS[key]);
  }

  return [];
}

export const normalizeItem = (item: ItemApi): ItemModel => {
  const missingFields: string[] = [];

  if (!item.description?.trim()) {
    missingFields.push('Описание');
  }

  missingFields.push(...getMissingParamFields(item));

  return { ...item, missingFields };
};
