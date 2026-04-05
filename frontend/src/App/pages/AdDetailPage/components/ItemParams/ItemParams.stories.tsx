import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ItemModel } from '@/types/itemTypes';

import ItemParams from './ItemParams';

const meta: Meta<typeof ItemParams> = {
  title: 'Components/ItemParams',
  component: ItemParams,
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
type Story = StoryObj<typeof ItemParams>;

export const Electronics: Story = {
  args: {
    category: 'electronics',
    params: {
      type: 'laptop',
      brand: 'Apple',
      model: 'M1 Pro',
      condition: 'new',
      color: 'Silver',
    } as ItemModel['params'],
  },
};

export const Auto: Story = {
  args: {
    category: 'auto',
    params: {
      brand: 'BMW',
      model: '320i',
      yearOfManufacture: 2020,
      mileage: 45000,
      transmission: 'automatic',
      enginePower: 184,
    } as ItemModel['params'],
  },
};

export const RealEstate: Story = {
  args: {
    category: 'real_estate',
    params: {
      type: 'flat',
      address: 'ул. Ленина, д. 10',
      area: 65,
      floor: 3,
    } as ItemModel['params'],
  },
};

export const PartiallyFilled: Story = {
  args: {
    category: 'electronics',
    params: {
      type: 'phone',
      brand: 'Samsung',
    } as ItemModel['params'],
  },
};

export const Empty: Story = {
  args: {
    category: 'electronics',
    params: {} as ItemModel['params'],
  },
};
