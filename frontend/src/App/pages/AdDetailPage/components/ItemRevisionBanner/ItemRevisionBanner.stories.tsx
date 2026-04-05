import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ItemRevisionBanner from './ItemRevisionBanner';

const meta: Meta<typeof ItemRevisionBanner> = {
  title: 'Components/ItemRevisionBanner',
  component: ItemRevisionBanner,
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
type Story = StoryObj<typeof ItemRevisionBanner>;

export const Default: Story = {
  args: {
    missingFields: ['Цвет', 'Состояние'],
  },
};

export const Single: Story = {
  args: {
    missingFields: ['Модель'],
  },
};

export const Multiple: Story = {
  args: {
    missingFields: ['Марка', 'Модель', 'Цвет', 'Состояние'],
  },
};
