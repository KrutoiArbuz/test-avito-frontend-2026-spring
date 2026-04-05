import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
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
type Story = StoryObj<typeof FormField>;

export const Text: Story = {
  render: () => {
    const [value, setValue] = useState('MacBook Pro 16"');
    return <FormField label="Название *" value={value} onChange={setValue} required />;
  },
};

export const TextRequired: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Название"
        value={value}
        onChange={setValue}
        required
        touched
        error={value === ''}
        placeholder="Введите название"
      />
    );
  },
};

export const TextOptional: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Фото (URL)"
        value={value}
        onChange={setValue}
        touched
        placeholder="https://example.com/photo.jpg"
      />
    );
  },
};

export const TextWarning: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Марка"
        value={value}
        onChange={setValue}
        touched
        placeholder="Введите марку"
      />
    );
  },
};

export const Multiline: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Описание"
        value={value}
        onChange={setValue}
        multiline
        rows={4}
        placeholder="Опишите товар подробнее..."
      />
    );
  },
};

export const Number: Story = {
  render: () => {
    const [value, setValue] = useState('120000');
    return <FormField label="Цена, ₽ *" value={value} onChange={setValue} required type="number" />;
  },
};

export const BoldLabel: Story = {
  render: () => {
    const [value, setValue] = useState('MacBook Pro 16"');
    return <FormField label="Название *" value={value} onChange={setValue} required bold />;
  },
};

export const RegularLabel: Story = {
  render: () => {
    const [value, setValue] = useState('Apple');
    return <FormField label="Марка" value={value} onChange={setValue} />;
  },
};
