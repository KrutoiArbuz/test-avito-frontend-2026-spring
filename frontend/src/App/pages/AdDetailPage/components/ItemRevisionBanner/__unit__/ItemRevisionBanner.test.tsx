import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { theme } from '@/config/theme';

import ItemRevisionBanner from '../ItemRevisionBanner';

const renderBanner = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <ItemRevisionBanner missingFields={['Цвет', 'Состояние']} {...props} />
    </ThemeProvider>
  );

describe('ItemRevisionBanner', () => {
  it('renders title "Требуются доработки"', () => {
    renderBanner();
    expect(screen.getByText('Требуются доработки')).toBeInTheDocument();
  });

  it('renders description text', () => {
    renderBanner();
    expect(screen.getByText('У объявления не заполнены поля:')).toBeInTheDocument();
  });

  it('renders warning icon', () => {
    renderBanner();
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders all missing fields', () => {
    renderBanner({ missingFields: ['Цвет', 'Состояние', 'Марка'] });
    expect(screen.getByText('Цвет')).toBeInTheDocument();
    expect(screen.getByText('Состояние')).toBeInTheDocument();
    expect(screen.getByText('Марка')).toBeInTheDocument();
  });

  it('renders fields as list items', () => {
    renderBanner({ missingFields: ['Поле 1', 'Поле 2'] });
    const listItems = document.querySelectorAll('li');
    expect(listItems.length).toBe(2);
  });

  it('renders single missing field', () => {
    renderBanner({ missingFields: ['Описание'] });
    expect(screen.getByText('Описание')).toBeInTheDocument();
    const listItems = document.querySelectorAll('li');
    expect(listItems.length).toBe(1);
  });

  it('renders multiple missing fields correctly', () => {
    renderBanner({ missingFields: ['Цвет', 'Состояние', 'Пробег', 'Год выпуска'] });
    const listItems = document.querySelectorAll('li');
    expect(listItems.length).toBe(4);
  });

  it('displays correct styling', () => {
    const { container } = renderBanner();
    const bannerBox = container.firstChild;
    expect(bannerBox).toBeInTheDocument();
  });

  it('renders missing field inside list item', () => {
    renderBanner({ missingFields: ['Тестовое поле'] });
    const listItem = document.querySelector('li');
    expect(listItem?.textContent).toContain('Тестовое поле');
  });

  it('renders with no fields', () => {
    renderBanner({ missingFields: [] });
    const listItems = document.querySelectorAll('li');
    expect(listItems.length).toBe(0);
    expect(screen.getByText('Требуются доработки')).toBeInTheDocument();
  });
});
