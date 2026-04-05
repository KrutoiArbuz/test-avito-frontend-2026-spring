import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import PageHeader from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
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
type Story = StoryObj<typeof PageHeader>;

export const Many: Story = { args: { count: 42, pluralWords: ['', '', ''] } };
export const One: Story = { args: { count: 1, pluralWords: ['', '', ''] } };
export const Zero: Story = { args: { count: 0, pluralWords: ['', '', ''] } };
export const Eleven: Story = { args: { count: 11, pluralWords: ['', '', ''] } };
