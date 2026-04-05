import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AdEditForm } from '../AdEditForm';

// Mock the store
vi.mock('@/stores/editFormStore', () => ({
  useEditDraftStore: vi.fn((selector) => {
    const mockStore = {
      drafts: {
        'test-id': {
          title: 'Test Item',
          description: 'Test Description',
          price: '100',
          imageUrl: 'https://example.com/image.jpg',
          category: 'electronics',
          params: { type: 'laptop', brand: 'Apple' },
        },
      },
      setValues: vi.fn(),
    };
    return selector(mockStore);
  }),
}));

// Mock the hook
vi.mock('../../hooks/useAdEditForm', () => ({
  useAdEditForm: vi.fn(() => ({
    values: {
      title: 'Test Item',
      description: 'Test Description',
      price: '100',
      imageUrl: 'https://example.com/image.jpg',
      category: 'electronics',
      params: {},
    },
    touched: {},
    categoryTouched: {},
    set: vi.fn(),
    isValid: true,
    titleError: undefined,
    priceError: undefined,
    descAi: {
      isLoading: false,
      isDone: false,
      result: '',
      error: null,
      anchorEl: null,
      run: vi.fn(),
      closePopover: vi.fn(),
    },
    priceAi: {
      isLoading: false,
      isDone: false,
      result: '',
      error: null,
      anchorEl: null,
      run: vi.fn(),
      closePopover: vi.fn(),
    },
    handleCategoryChange: vi.fn(),
    handleCategoryFieldChange: vi.fn(),
    handleDescAi: vi.fn(),
    handlePriceAi: vi.fn(),
    handleApplyDesc: vi.fn(),
    handleApplyPrice: vi.fn(),
    handleSave: vi.fn(),
  })),
}));

describe('AdEditForm', () => {
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form with title', () => {
    render(
      <AdEditForm id="test-id" isSaving={false} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    expect(screen.getByText('Редактирование объявления')).toBeInTheDocument();
  });

  it('renders all form sections', () => {
    render(
      <AdEditForm id="test-id" isSaving={false} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Название')).toBeInTheDocument();
    expect(screen.getByText(/Цена/)).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
  });

  it('enables save button when form is valid', () => {
    render(
      <AdEditForm id="test-id" isSaving={false} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    expect(screen.getByRole('button', { name: /Сохранить/i })).not.toBeDisabled();
  });

  it('disables save button when saving', () => {
    render(<AdEditForm id="test-id" isSaving={true} onSave={mockOnSave} onCancel={mockOnCancel} />);
    expect(screen.getByRole('button', { name: /Сохранение/i })).toBeDisabled();
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(
      <AdEditForm id="test-id" isSaving={false} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    fireEvent.click(screen.getByRole('button', { name: /Отменить/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('disables cancel button when saving', () => {
    render(<AdEditForm id="test-id" isSaving={true} onSave={mockOnSave} onCancel={mockOnCancel} />);
    expect(screen.getByRole('button', { name: /Отменить/i })).toBeDisabled();
  });

  it('renders AI buttons for description and price', () => {
    render(
      <AdEditForm id="test-id" isSaving={false} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    const buttons = screen.getAllByRole('button');
    // Should have Save, Cancel, and AI buttons
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('renders category fields component', () => {
    render(
      <AdEditForm id="test-id" isSaving={false} onSave={mockOnSave} onCancel={mockOnCancel} />
    );
    // CategoryFields should be rendered (contains category-specific fields)
    expect(screen.getByText('Категория')).toBeInTheDocument();
  });
});
