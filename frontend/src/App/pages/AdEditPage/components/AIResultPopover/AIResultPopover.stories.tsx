import { Box, Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';

import { AIResultPopover } from './AIResultPopover';

const meta: Meta<typeof AIResultPopover> = {
  title: 'Components/AIResultPopover',
  component: AIResultPopover,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AIResultPopover>;

const PopoverWrapper = (args: Record<string, unknown>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = () => {
    setAnchorEl(buttonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button ref={buttonRef} variant="contained" onClick={handleOpen}>
        Open Popover
      </Button>
      <AIResultPopover
        {...args}
        anchorEl={anchorEl}
        onClose={handleClose}
        result={args.result as string}
        error={args.error as boolean}
        onApply={args.onApply as (() => void) | undefined}
      />
    </>
  );
};

export const DescriptionResult: Story = {
  render: (args) => <PopoverWrapper {...args} />,
  args: {
    result:
      'Продаю MacBook Pro 16" M1 Pro в отличном состоянии. Ноутбук работал бережно, все функции исправны. Полная комплектация, без царапин.',
    error: false,
    onApply: () => alert('Description applied!'),
  },
};

export const PriceResult: Story = {
  render: (args) => <PopoverWrapper {...args} />,
  args: {
    result: 'Средняя цена: 115 000 – 135 000 ₽',
    error: false,
    onApply: () => alert('Price applied!'),
  },
};

export const ErrorState: Story = {
  render: (args) => <PopoverWrapper {...args} />,
  args: {
    result: '',
    error: true,
    onApply: undefined,
  },
};

export const LongText: Story = {
  render: (args) => <PopoverWrapper {...args} />,
  args: {
    result: `Apple MacBook Pro 16" с процессором M1 Pro - это мощный ноутбук для профессиональной работы. Характеристики:
• Процессор: Apple M1 Pro
• ОЗУ: 16 GB
• Накопитель: 512 GB SSD
• Экран: 16" Retina
• Состояние: как новый
• Комплектация: полная, с зарядкой

Идеален для видеомонтажа, дизайна и разработки.`,
    error: false,
    onApply: () => alert('Long description applied!'),
  },
};
