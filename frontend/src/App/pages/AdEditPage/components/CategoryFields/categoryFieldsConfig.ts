import type { CategoryType } from '@/types/itemTypes';

type FieldConfig =
  | {
      label: string;
      fieldName: string;
      type: 'text';
      placeholder?: string;
    }
  | {
      label: string;
      fieldName: string;
      type: 'number';
      placeholder?: string;
    }
  | {
      label: string;
      fieldName: string;
      type: 'select';
      options: { label: string; value: string }[];
    };

type CategoryConfig = Record<CategoryType, FieldConfig[]>;

export const categoryFieldsConfig: CategoryConfig = {
  auto: [
    { label: 'Марка', fieldName: 'brand', type: 'text' },
    { label: 'Модель', fieldName: 'model', type: 'text' },
    { label: 'Год выпуска', fieldName: 'yearOfManufacture', type: 'number' },
    { label: 'Пробег (км)', fieldName: 'mileage', type: 'number' },
  ],
  real_estate: [
    {
      label: 'Тип',
      fieldName: 'type',
      type: 'select',
      options: [
        { label: 'Квартира', value: 'flat' },
        { label: 'Дом', value: 'house' },
        { label: 'Комната', value: 'room' },
      ],
    },
    { label: 'Площадь (м²)', fieldName: 'area', type: 'number' },
    { label: 'Этаж', fieldName: 'floor', type: 'number' },
  ],
  electronics: [
    {
      label: 'Тип',
      fieldName: 'type',
      type: 'select',
      options: [
        { label: 'Телефон', value: 'phone' },
        { label: 'Ноутбук', value: 'laptop' },
        { label: 'Другое', value: 'misc' },
      ],
    },
    { label: 'Марка', fieldName: 'brand', type: 'text' },
    { label: 'Модель', fieldName: 'model', type: 'text' },
    { label: 'Цвет', fieldName: 'color', type: 'text' },
    {
      label: 'Состояние',
      fieldName: 'condition',
      type: 'select',
      options: [
        { label: 'Новое', value: 'new' },
        { label: 'Б/У', value: 'used' },
      ],
    },
  ],
};
