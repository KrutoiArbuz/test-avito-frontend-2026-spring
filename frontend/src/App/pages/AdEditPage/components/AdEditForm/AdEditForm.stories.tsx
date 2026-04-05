import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AdEditForm } from './AdEditForm';

const meta: Meta<typeof AdEditForm> = {
  title: 'Pages/AdEditForm',
  component: AdEditForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdEditForm>;

export const Default: Story = {
  args: {
    onSave: (data) => alert(JSON.stringify(data, null, 2)),
    onCancel: () => alert('Cancelled'),
  },
};

export const Empty: Story = {
  render: () => (
    <AdEditForm
      onSave={(data) => alert(JSON.stringify(data, null, 2))}
      onCancel={() => alert('Cancelled')}
    />
  ),
};
