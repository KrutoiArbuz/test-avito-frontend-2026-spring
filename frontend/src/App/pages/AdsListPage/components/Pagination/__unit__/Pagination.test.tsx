import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { theme } from '@/config/theme';

import Pagination from '../Pagination';

const renderPagination = (
  props: { count?: number; page?: number; onChange?: (p: number) => void } = {}
) =>
  render(
    <ThemeProvider theme={theme}>
      <Pagination count={5} page={1} onChange={vi.fn()} {...props} />
    </ThemeProvider>
  );

describe('Pagination', () => {
  it('renders navigation', () => {
    renderPagination();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows page buttons for count=3', () => {
    renderPagination({ count: 3 });
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onChange with correct page when clicked', async () => {
    const onChange = vi.fn();
    renderPagination({ count: 3, page: 1, onChange });
    await userEvent.click(screen.getByText('2'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('highlights current page', () => {
    renderPagination({ count: 5, page: 3 });
    const page3 = screen.getByRole('button', { name: 'page 3' });
    expect(page3).toHaveAttribute('aria-current', 'page');
  });
});
