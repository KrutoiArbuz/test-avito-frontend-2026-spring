import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { theme } from '@/config/theme';

import ItemHeader from '../ItemHeader';

const defaultProps = {
  title: 'MacBook Pro 16"',
  price: 64000,
  createdAt: '2025-03-10T19:39:00Z',
  editAt: '2025-03-12T10:30:00Z',
  onEdit: vi.fn(),
};

const renderHeader = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <ItemHeader {...defaultProps} {...props} />
    </ThemeProvider>
  );

describe('ItemHeader', () => {
  it('renders title', () => {
    renderHeader();
    expect(screen.getByText('MacBook Pro 16"')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    renderHeader({ price: 1000000 });
    expect(screen.getByText(/1\s000\s000/)).toBeInTheDocument();
    expect(screen.getByText(/₽/)).toBeInTheDocument();
  });

  it('renders edit button', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: 'Редактировать' })).toBeInTheDocument();
  });

  it('renders publication date label', () => {
    renderHeader();
    expect(screen.getByText(/Опубликовано:/)).toBeInTheDocument();
  });

  it('renders edited date label', () => {
    renderHeader();
    expect(screen.getByText(/Отредактировано:/)).toBeInTheDocument();
  });

  it('formats and displays creation date', () => {
    renderHeader({ createdAt: '2025-03-10T19:39:00Z' });
    const published = screen.getByText(/Опубликовано:/);
    expect(published).toBeInTheDocument();
  });

  it('formats and displays edit date', () => {
    renderHeader({ editAt: '2025-03-12T10:30:00Z' });
    const edited = screen.getByText(/Отредактировано:/);
    expect(edited).toBeInTheDocument();
  });

  it('calls onEdit when edit button clicked', async () => {
    const onEdit = vi.fn();
    renderHeader({ onEdit });
    const editButton = screen.getByRole('button', { name: 'Редактировать' });
    await userEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it('renders edit icon in button', () => {
    renderHeader();
    const editButton = screen.getByRole('button', { name: 'Редактировать' });
    expect(editButton.querySelector('svg')).toBeInTheDocument();
  });

  it('displays correct price format for large amount', () => {
    renderHeader({ price: 64000 });
    expect(screen.getByText(/64\s000/)).toBeInTheDocument();
  });
});
