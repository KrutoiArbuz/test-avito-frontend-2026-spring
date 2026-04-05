import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { LayoutType } from '@/types/layoutType';

import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    const [layout, setLayout] = useState<LayoutType>('grid');
    const [sort, setSort] = useState('createdAt_desc');

    return (
      <SearchBar
        value={search}
        onChange={setSearch}
        layout={layout}
        onLayoutChange={setLayout}
        sortValue={sort}
        onSortChange={setSort}
      />
    );
  },
};
