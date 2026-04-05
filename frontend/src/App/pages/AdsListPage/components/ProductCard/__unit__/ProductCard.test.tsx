import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { theme } from '@/config/theme';

import ProductCard from '../ProductCard';

const renderCard = (props = {}) => {
  const defaultProps = {
    category: 'electronics' as const,
    title: 'Наушники',
    price: 2990,
    needsRevision: false,
    onClick: vi.fn(),
  };
  return render(
    <ThemeProvider theme={theme}>
      <ProductCard {...defaultProps} {...props} />
    </ThemeProvider>
  );
};

describe('ProductCard', () => {
  it('renders title', () => {
    renderCard();
    expect(screen.getByText('Наушники')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    renderCard({ price: 1100000 });
    const priceElement = screen.getByText(/1\u00a0100\u00a0000|1\s100\s000/);
    expect(priceElement).toBeInTheDocument();
    expect(priceElement.closest('p')?.textContent).toContain('₽');
  });

  it('renders category label for electronics', () => {
    renderCard({ category: 'electronics' });
    expect(screen.getByText('Электроника')).toBeInTheDocument();
  });

  it('renders category label for auto', () => {
    renderCard({ category: 'auto' });
    expect(screen.getByText('Транспорт')).toBeInTheDocument();
  });

  it('renders category label for real_estate', () => {
    renderCard({ category: 'real_estate' });
    expect(screen.getByText('Недвижимость')).toBeInTheDocument();
  });

  it('shows placeholder icon when imageUrl is not provided', () => {
    renderCard();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('shows img element when imageUrl is provided', () => {
    renderCard({ imageUrl: 'https://example.com/img.jpg' });
    const img = screen.getByRole('img', { name: 'Наушники' });
    expect(img).toHaveAttribute('src', 'https://example.com/img.jpg');
  });

  it('renders needsRevision badge when true', () => {
    renderCard({ needsRevision: true });
    expect(screen.getByText('Требует доработок')).toBeInTheDocument();
  });

  it('does not render needsRevision badge when false', () => {
    renderCard({ needsRevision: false });
    expect(screen.queryByText('Требует доработок')).not.toBeInTheDocument();
  });

  it('calls onClick when card is clicked', async () => {
    const onClick = vi.fn();
    renderCard({ onClick });
    await userEvent.click(screen.getByText('Наушники'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
