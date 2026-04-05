import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { theme } from '@/config/theme';

import ItemImage from '../ItemImage';

const renderImage = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <ItemImage title="Test Item" imageUrl={undefined} {...props} />
    </ThemeProvider>
  );

describe('ItemImage', () => {
  it('renders CardImage component when imageUrl is provided', () => {
    renderImage({ imageUrl: 'https://example.com/image.jpg' });
    const img = screen.getByRole('img', { name: 'Test Item' });
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('passes correct title to CardImage', () => {
    renderImage({ title: 'MacBook Pro', imageUrl: 'https://example.com/macbook.jpg' });
    const img = screen.getByRole('img', { name: 'MacBook Pro' });
    expect(img).toBeInTheDocument();
  });

  it('renders placeholder when no image url provided', () => {
    renderImage({ imageUrl: undefined });
    // CardImage should render a placeholder icon even without imageUrl
    const { container } = renderImage({ imageUrl: undefined });
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with proper structure', () => {
    const { container } = renderImage();
    const outerBox = container.firstChild;
    expect(outerBox).toBeInTheDocument();
  });
});
