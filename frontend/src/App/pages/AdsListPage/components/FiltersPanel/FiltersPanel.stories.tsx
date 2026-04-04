import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { Category } from '@/types/api';

import FiltersPanel from './FiltersPanel';

const meta: Meta<typeof FiltersPanel> = {
  title: 'Components/FiltersPanel',
  component: FiltersPanel,
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
type Story = StoryObj<typeof FiltersPanel>;

export const Default: Story = {
  render: () => {
    const [categories, setCategories] = useState<Category[]>(['auto']);
    const [needsRevision, setNeedsRevision] = useState(false);

    return (
      <FiltersPanel
        selectedCategories={categories}
        onCategoriesChange={setCategories}
        needsRevision={needsRevision}
        onNeedsRevisionChange={setNeedsRevision}
        onReset={() => {
          setCategories([]);
          setNeedsRevision(false);
        }}
      />
    );
  },
};
