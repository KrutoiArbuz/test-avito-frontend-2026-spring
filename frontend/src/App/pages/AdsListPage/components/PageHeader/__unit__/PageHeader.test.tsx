import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { theme } from '@/config/theme';
import type { PluralFormsType } from '@/utils/pluralFormatter';

import PageHeader from '../PageHeader';

const pluralWords: PluralFormsType = ['объявление', 'объявления', 'объявлений'];

const renderHeader = (count: number) =>
  render(
    <ThemeProvider theme={theme}>
      <PageHeader count={count} pluralWords={pluralWords} />
    </ThemeProvider>
  );

describe('PageHeader', () => {
  it('renders title', () => {
    renderHeader(42);
    expect(screen.getByText('Мои объявления')).toBeInTheDocument();
  });

  it('shows correct plural for 1', () => {
    renderHeader(1);
    expect(screen.getByText('1 объявление')).toBeInTheDocument();
  });

  it('shows correct plural for 2', () => {
    renderHeader(2);
    expect(screen.getByText('2 объявления')).toBeInTheDocument();
  });

  it('shows correct plural for 5', () => {
    renderHeader(5);
    expect(screen.getByText('5 объявлений')).toBeInTheDocument();
  });

  it('shows correct plural for 11', () => {
    renderHeader(11);
    expect(screen.getByText('11 объявлений')).toBeInTheDocument();
  });

  it('shows correct plural for 21', () => {
    renderHeader(21);
    expect(screen.getByText('21 объявление')).toBeInTheDocument();
  });

  it('shows correct plural for 0', () => {
    renderHeader(0);
    expect(screen.getByText('0 объявлений')).toBeInTheDocument();
  });
});
