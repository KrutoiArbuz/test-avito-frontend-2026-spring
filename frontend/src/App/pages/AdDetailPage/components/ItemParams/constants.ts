import type {
  AutoItemParamsApi,
  CategoryType,
  ElectronicsItemParamsApi,
  ItemModel,
  RealEstateItemParamsApi,
} from '@/types/itemTypes';

export const TRANSMISSION_LABELS: Record<string, string> = {
  automatic: 'Автоматическая',
  manual: 'Механическая',
};

export const RE_TYPE_LABELS: Record<string, string> = {
  flat: 'Квартира',
  house: 'Дом',
  room: 'Комната',
};

export const EL_TYPE_LABELS: Record<string, string> = {
  phone: 'Смартфон',
  laptop: 'Ноутбук',
  misc: 'Другое',
};

export const CONDITION_LABELS: Record<string, string> = {
  new: 'Новый',
  used: 'Б/у',
};

const getAutoParams = (params: AutoItemParamsApi) => [
  { label: 'Марка', value: params.brand },
  { label: 'Модель', value: params.model },
  { label: 'Год выпуска', value: params.yearOfManufacture },
  { label: 'Пробег (км)', value: params.mileage },
  {
    label: 'КПП',
    value: params.transmission ? TRANSMISSION_LABELS[params.transmission] : undefined,
  },
  { label: 'Мощность (л.с.)', value: params.enginePower },
];

const getRealEstateParams = (params: RealEstateItemParamsApi) => [
  { label: 'Тип', value: params.type ? RE_TYPE_LABELS[params.type] : undefined },
  { label: 'Адрес', value: params.address },
  { label: 'Площадь (м²)', value: params.area },
  { label: 'Этаж', value: params.floor },
];

const getElectronicsParams = (params: ElectronicsItemParamsApi) => [
  { label: 'Тип', value: params.type ? EL_TYPE_LABELS[params.type] : undefined },
  { label: 'Бренд', value: params.brand },
  { label: 'Модель', value: params.model },
  {
    label: 'Состояние',
    value: params.condition ? CONDITION_LABELS[params.condition] : undefined,
  },
  { label: 'Цвет', value: params.color },
];

export const getParamsRows = (category: CategoryType, params: ItemModel['params']) => {
  switch (category) {
    case 'auto':
      return getAutoParams(params as AutoItemParamsApi);
    case 'real_estate':
      return getRealEstateParams(params as RealEstateItemParamsApi);
    case 'electronics':
      return getElectronicsParams(params as ElectronicsItemParamsApi);
    default:
      return [];
  }
};
