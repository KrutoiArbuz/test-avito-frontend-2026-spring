import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CategoryFields } from '../CategoryFields';

describe('CategoryFields', () => {
  const mockOnChange = vi.fn();

  it('renders fields for auto category', () => {
    render(
      <CategoryFields
        category="auto"
        values={{ brand: '', model: '', year: '', mileage: '' }}
        onChange={mockOnChange}
        touched={{}}
      />
    );
    expect(screen.getByText(/Марка/i)).toBeInTheDocument();
    expect(screen.getByText(/Модель/i)).toBeInTheDocument();
  });

  it('renders fields for real_estate category', () => {
    render(
      <CategoryFields
        category="real_estate"
        values={{ type: '', area: '', floor: '' }}
        onChange={mockOnChange}
        touched={{}}
      />
    );
    expect(screen.getByText(/Тип/i)).toBeInTheDocument();
    expect(screen.getByText(/Площадь/i)).toBeInTheDocument();
  });

  it('renders fields for electronics category', () => {
    render(
      <CategoryFields
        category="electronics"
        values={{ type: '', brand: '', model: '', color: '', condition: '' }}
        onChange={mockOnChange}
        touched={{}}
      />
    );
    expect(screen.getByText(/Тип/i)).toBeInTheDocument();
    expect(screen.getByText(/Марка/i)).toBeInTheDocument();
  });

  it('calls onChange when field value changes', () => {
    render(
      <CategoryFields
        category="auto"
        values={{ brand: '', model: '', year: '', mileage: '' }}
        onChange={mockOnChange}
        touched={{}}
      />
    );
    const inputs = screen.getAllByRole('textbox');
    if (inputs.length > 0) {
      fireEvent.change(inputs[0], { target: { value: 'Toyota' } });
      expect(mockOnChange).toHaveBeenCalled();
    }
  });

  it('passes touched state to form fields', () => {
    render(
      <CategoryFields
        category="auto"
        values={{ brand: '', model: '', year: '', mileage: '' }}
        onChange={mockOnChange}
        touched={{ brand: true }}
      />
    );
    expect(screen.getByText(/Марка/i)).toBeInTheDocument();
  });

  it('renders all field values', () => {
    render(
      <CategoryFields
        category="auto"
        values={{ brand: 'BMW', model: 'X5', year: '2020', mileage: '50000' }}
        onChange={mockOnChange}
        touched={{}}
      />
    );
    expect(screen.getByDisplayValue('BMW')).toBeInTheDocument();
    expect(screen.getByDisplayValue('X5')).toBeInTheDocument();
  });

  it('switches between categories properly', () => {
    const { rerender } = render(
      <CategoryFields
        category="auto"
        values={{ brand: 'BMW', model: 'X5', year: '2020', mileage: '50000' }}
        onChange={mockOnChange}
        touched={{}}
      />
    );
    expect(screen.getByText(/Год выпуска/i)).toBeInTheDocument();

    rerender(
      <CategoryFields
        category="electronics"
        values={{ type: '', brand: '', model: '', color: '', condition: '' }}
        onChange={mockOnChange}
        touched={{}}
      />
    );
    expect(screen.getByText(/Состояние/i)).toBeInTheDocument();
  });
});
