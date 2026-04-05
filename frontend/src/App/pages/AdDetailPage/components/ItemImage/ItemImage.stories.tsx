import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ItemImage from './ItemImage';

const meta: Meta<typeof ItemImage> = {
  title: 'Components/ItemImage',
  component: ItemImage,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, bgcolor: 'background.default', maxWidth: 480 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ItemImage>;

export const Placeholder: Story = {
  args: {
    title: 'MacBook Pro 16"',
  },
};

export const MultipleImages: Story = {
  args: {
    title: 'MacBook Pro 16"',
    imageUrls: ['', '', '', '', '', '', '', ''],
  },
};
