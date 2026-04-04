import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { theme } from '@/config/theme';

import SearchBar from '../SearchBar';

const defaultProps = {
  value: '',
  onChange: vi.fn(),
  layout: 'grid' as const,
  onLayoutChange: vi.fn(),
  sortValue: 'createdAt_desc',
  onSortChange: vi.fn(),
};

const renderBar = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <SearchBar {...defaultProps} {...props} />
    </ThemeProvider>
  );

describe('SearchBar', () => {
  it('renders search input with placeholder', () => {
    renderBar();
    expect(screen.getByPlaceholderText('Найти объявление....')).toBeInTheDocument();
  });

  it('shows current search value', () => {
    renderBar({ value: 'MacBook' });
    expect(screen.getByDisplayValue('MacBook')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const onChange = vi.fn();
    renderBar({ onChange });
    const input = screen.getByPlaceholderText('Найти объявление....');
    await userEvent.type(input, 'iPhone');
    expect(onChange).toHaveBeenCalled();
  });

  it('renders grid layout button', () => {
    renderBar();
    expect(screen.getByLabelText('Сетка')).toBeInTheDocument();
  });

  it('renders list layout button', () => {
    renderBar();
    expect(screen.getByLabelText('Список')).toBeInTheDocument();
  });

  it('calls onLayoutChange with "grid" when grid button clicked', async () => {
    const onLayoutChange = vi.fn();
    renderBar({ layout: 'list', onLayoutChange });
    await userEvent.click(screen.getByLabelText('Сетка'));
    expect(onLayoutChange).toHaveBeenCalledWith('grid');
  });

  it('calls onLayoutChange with "list" when list button clicked', async () => {
    const onLayoutChange = vi.fn();
    renderBar({ onLayoutChange });
    await userEvent.click(screen.getByLabelText('Список'));
    expect(onLayoutChange).toHaveBeenCalledWith('list');
  });

  it('renders sort dropdown with current value', () => {
    renderBar({ sortValue: 'createdAt_desc' });
    expect(screen.getByText('По новизне (сначала новые)')).toBeInTheDocument();
  });
});
