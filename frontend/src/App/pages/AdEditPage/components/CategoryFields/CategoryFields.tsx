import { Stack, Typography } from '@mui/material';

import type { CategoryType } from '@/types/itemTypes';

import { FormField } from '../FormField';
import { FormSelect } from '../FormSelect';

import { categoryFieldsConfig } from './categoryFieldsConfig';

type CategoryFieldsProps = {
  category: CategoryType;
  values: Record<string, string>;
  onChange: (field: string, value: string) => void;
  touched: Record<string, boolean>;
};

export const CategoryFields = ({ category, values, onChange, touched }: CategoryFieldsProps) => {
  const fields = categoryFieldsConfig[category];

  return (
    <Stack gap={1}>
      <Typography variant="subtitle2">Характеристики</Typography>
      <Stack gap={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {fields.map((field) => {
          const value = values[field.fieldName] || '';
          const isTouched = touched[field.fieldName] || false;

          if (field.type === 'select') {
            return (
              <FormSelect
                key={field.fieldName}
                label={field.label}
                value={value}
                onChange={(val) => onChange(field.fieldName, val)}
                options={field.options}
                touched={isTouched}
              />
            );
          }

          return (
            <FormField
              key={field.fieldName}
              label={field.label}
              value={value}
              onChange={(val) => onChange(field.fieldName, val)}
              type={field.type}
              touched={isTouched}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
