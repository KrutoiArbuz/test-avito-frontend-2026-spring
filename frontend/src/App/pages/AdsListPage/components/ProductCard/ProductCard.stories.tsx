import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ProductCard from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 2,
          p: 2,
          bgcolor: 'background.default',
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    category: 'electronics',
    title: 'Наушники Sony WH-1000XM5 с шумоподавлением',
    price: 32990,
    needsRevision: false,
    layout: 'grid',
  },
};

export const WithoutImage: Story = {
  args: {
    category: 'auto',
    title: 'BMW 5 Series 530i 2021 года, состояние отличное',
    price: 3500000,
    needsRevision: false,
    layout: 'list',
  },
};

export const NeedsRevision: Story = {
  args: {
    category: 'real_estate',
    title: 'Студия у метро Речной вокзал',
    price: 5800000,
    needsRevision: true,
    layout: 'grid',
  },
};

export const NeedsRevisionNoImage: Story = {
  args: {
    category: 'auto',
    title: 'Комплект зимних шин Michelin X-Ice',
    price: 45000,
    needsRevision: true,
    layout: 'list',
  },
};
