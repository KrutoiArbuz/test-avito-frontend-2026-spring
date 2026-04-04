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
  },
};

export const WithImage: Story = {
  args: {
    category: 'auto',
    title: 'BMW 5 Series 530i 2021 года, состояние отличное',
    price: 3500000,
    imageUrl:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80',
    needsRevision: false,
  },
};

export const NeedsRevision: Story = {
  args: {
    category: 'real_estate',
    title: 'Студия у метро Речной вокзал',
    price: 5800000,
    needsRevision: true,
  },
};

export const NeedsRevisionWithImage: Story = {
  args: {
    category: 'auto',
    title: 'Комплект зимних шин Michelin X-Ice',
    price: 45000,
    imageUrl:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80',
    needsRevision: true,
  },
};
