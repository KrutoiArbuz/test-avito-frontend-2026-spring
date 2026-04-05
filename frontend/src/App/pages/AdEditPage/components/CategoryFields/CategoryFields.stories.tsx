import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { CategoryFields } from './CategoryFields';

const meta: Meta<typeof CategoryFields> = {
  title: 'Components/CategoryFields',
  component: CategoryFields,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, bgcolor: 'background.default', maxWidth: 400 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CategoryFields>;

export const AutoCategory: Story = {
  render: () => {
    const [values, setValues] = useState({
      brand: 'BMW',
      model: '320i',
      yearOfManufacture: '2020',
      mileage: '45000',
    });
    const [touched, setTouched] = useState({});

    return (
      <CategoryFields
        category="auto"
        values={values}
        onChange={(field, value) => {
          setValues({ ...values, [field]: value });
          setTouched({ ...touched, [field]: true });
        }}
        touched={touched}
      />
    );
  },
};

export const RealEstateCategory: Story = {
  render: () => {
    const [values, setValues] = useState({
      type: 'flat',
      area: '65',
      floor: '3',
    });
    const [touched, setTouched] = useState({});

    return (
      <CategoryFields
        category="real_estate"
        values={values}
        onChange={(field, value) => {
          setValues({ ...values, [field]: value });
          setTouched({ ...touched, [field]: true });
        }}
        touched={touched}
      />
    );
  },
};

export const ElectronicsCategory: Story = {
  render: () => {
    const [values, setValues] = useState({
      type: 'laptop',
      brand: 'Apple',
      model: 'M1 Pro',
      color: 'Silver',
      condition: 'new',
    });
    const [touched, setTouched] = useState({});

    return (
      <CategoryFields
        category="electronics"
        values={values}
        onChange={(field, value) => {
          setValues({ ...values, [field]: value });
          setTouched({ ...touched, [field]: true });
        }}
        touched={touched}
      />
    );
  },
};

export const ElectronicsCategoryEmpty: Story = {
  render: () => {
    const [values, setValues] = useState({});
    const [touched] = useState({
      type: true,
      brand: true,
      model: true,
      color: true,
      condition: true,
    });

    return (
      <CategoryFields
        category="electronics"
        values={values}
        onChange={(field, value) => {
          setValues({ ...values, [field]: value });
        }}
        touched={touched}
      />
    );
  },
};
