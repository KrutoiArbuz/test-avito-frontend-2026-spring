import type { Meta, StoryObj } from '@storybook/react-vite';

import { AIButton } from './AIButton';

const meta: Meta<typeof AIButton> = {
  title: 'Components/AIButton',
  component: AIButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AIButton>;

export const DescriptionEmpty: Story = {
  args: {
    isLoading: false,
    hasValue: false,
    hasResult: false,
    onClick: () => alert('AI request'),
    variant: 'description',
  },
};

export const DescriptionFilled: Story = {
  args: {
    isLoading: false,
    hasValue: true,
    hasResult: false,
    onClick: () => alert('AI request'),
    variant: 'description',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    hasValue: false,
    hasResult: false,
    onClick: () => alert('Loading...'),
    variant: 'description',
  },
};

export const HasResult: Story = {
  args: {
    isLoading: false,
    hasValue: false,
    hasResult: true,
    onClick: () => alert('AI request'),
    variant: 'description',
  },
};

export const PriceButton: Story = {
  args: {
    isLoading: false,
    hasValue: false,
    hasResult: false,
    onClick: () => alert('Get price'),
    variant: 'price',
  },
};
