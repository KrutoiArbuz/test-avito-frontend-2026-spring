import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ItemHeader from './ItemHeader';

const meta: Meta<typeof ItemHeader> = {
  title: 'Components/ItemHeader',
  component: ItemHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, bgcolor: 'background.default' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ItemHeader>;

export const Default: Story = {
  args: {
    title: 'MacBook Pro 16"',
    price: 64000,
    createdAt: '2025-03-10T19:39:00Z',
    editAt: '2025-03-10T19:39:00Z',
    onEdit: () => alert('Edit clicked'),
  },
};

export const ExpensiveItem: Story = {
  args: {
    title: 'Tesla Model S',
    price: 5000000,
    createdAt: '2025-02-15T10:30:00Z',
    editAt: '2025-03-10T19:39:00Z',
    onEdit: () => alert('Edit clicked'),
  },
};

export const CheapItem: Story = {
  args: {
    title: 'Старый стул',
    price: 500,
    createdAt: '2025-03-05T14:15:00Z',
    editAt: '2025-03-10T19:39:00Z',
    onEdit: () => alert('Edit clicked'),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Квартира 3-комнатная в центре города с отличным видом на улицу',
    price: 12500000,
    createdAt: '2025-01-20T08:00:00Z',
    editAt: '2025-03-10T19:39:00Z',
    onEdit: () => alert('Edit clicked'),
  },
};
