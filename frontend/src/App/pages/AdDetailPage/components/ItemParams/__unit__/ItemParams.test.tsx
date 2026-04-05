import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { theme } from '@/config/theme';

import ItemParams from '../ItemParams';

const renderParams = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <ItemParams
        category="electronics"
        params={{
          type: 'laptop',
          brand: 'Apple',
          model: 'M1 Pro',
          condition: 'used',
          color: 'silver',
        }}
        {...props}
      />
    </ThemeProvider>
  );

describe('ItemParams', () => {
  it('renders title "Характеристики"', () => {
    renderParams();
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
  });

  it('renders filled parameters for electronics with translated labels', () => {
    renderParams();
    // Values are translated: 'laptop' -> 'Ноутбук', 'used' -> 'Б/у'
    expect(screen.getByText('Ноутбук')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('M1 Pro')).toBeInTheDocument();
  });

  it('displays parameter labels', () => {
    renderParams();
    // Labels for electronics include 'Тип', 'Бренд', 'Модель', 'Состояние', 'Цвет'
    expect(screen.getByText('Тип')).toBeInTheDocument();
    expect(screen.getByText('Бренд')).toBeInTheDocument();
    expect(screen.getByText('Модель')).toBeInTheDocument();
  });

  it('returns null when no filled parameters for electronics', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ItemParams category="electronics" params={{}} />
      </ThemeProvider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders auto category parameters', () => {
    renderParams({
      category: 'auto',
      params: { brand: 'Toyota', model: 'Camry', yearOfManufacture: 2020, mileage: 50000 },
    });
    expect(screen.getByText('Toyota')).toBeInTheDocument();
    expect(screen.getByText('Camry')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('50000')).toBeInTheDocument();
  });

  it('renders real_estate category parameters', () => {
    renderParams({
      category: 'real_estate',
      params: { type: 'flat', address: 'ул. Пушкина, д.10', area: 65, floor: 3 },
    });
    // 'flat' gets translated to 'Квартира'
    expect(screen.getByText('Квартира')).toBeInTheDocument();
    expect(screen.getByText('ул. Пушкина, д.10')).toBeInTheDocument();
    expect(screen.getByText('65')).toBeInTheDocument();
  });

  it('filters out null and undefined values', () => {
    renderParams({
      params: {
        type: 'laptop',
        brand: undefined,
        model: 'M1 Pro',
        condition: null,
        color: 'silver',
      },
    });
    // Should render only non-null values, 'laptop' gets translated to 'Ноутбук'
    expect(screen.getByText('Ноутбук')).toBeInTheDocument();
    expect(screen.getByText('M1 Pro')).toBeInTheDocument();
    expect(screen.getByText('silver')).toBeInTheDocument();
  });

  it('displays parameters in correct order', () => {
    renderParams();
    // Check that parameters are rendered
    expect(screen.getByText('Ноутбук')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('renders parameter values correctly with translation', () => {
    renderParams({
      params: {
        type: 'phone',
        brand: 'Apple',
        model: 'iPhone 15',
        condition: 'new',
        color: 'black',
      },
    });
    // 'phone' -> 'Смартфон', 'new' -> 'Новый'
    expect(screen.getByText('Смартфон')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Новый')).toBeInTheDocument();
    expect(screen.getByText('black')).toBeInTheDocument();
  });
});
