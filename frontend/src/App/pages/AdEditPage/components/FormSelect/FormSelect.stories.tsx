import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { FormSelect } from './FormSelect';

const meta: Meta<typeof FormSelect> = {
  title: 'Components/FormSelect',
  component: FormSelect,
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
type Story = StoryObj<typeof FormSelect>;

const categoryOptions = [
  { label: 'Автомобили', value: 'auto' },
  { label: 'Недвижимость', value: 'real_estate' },
  { label: 'Электроника', value: 'electronics' },
];

const typeOptions = [
  { label: 'Седан', value: 'sedan' },
  { label: 'Кроссовер', value: 'crossover' },
  { label: 'Минивэн', value: 'minivan' },
];

export const Category: Story = {
  render: () => {
    const [value, setValue] = useState('auto');
    return (
      <FormSelect
        label="Категория"
        value={value}
        onChange={setValue}
        options={categoryOptions}
        required
      />
    );
  },
};

export const CategoryEmpty: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormSelect
        label="Категория *"
        value={value}
        onChange={setValue}
        options={categoryOptions}
        required
        touched
        error={value === ''}
      />
    );
  },
};

export const Type: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormSelect label="Тип" value={value} onChange={setValue} options={typeOptions} touched />
    );
  },
};

export const TypeWarning: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormSelect label="Тип" value={value} onChange={setValue} options={typeOptions} touched />
    );
  },
};

export const BoldLabel: Story = {
  render: () => {
    const [value, setValue] = useState('auto');
    return (
      <FormSelect
        label="Категория *"
        value={value}
        onChange={setValue}
        options={categoryOptions}
        required
        bold
      />
    );
  },
};

export const RegularLabel: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormSelect label="Тип" value={value} onChange={setValue} options={typeOptions} touched />
    );
  },
};
