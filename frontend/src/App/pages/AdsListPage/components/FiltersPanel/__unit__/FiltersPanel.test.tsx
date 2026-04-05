import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { theme } from '@/config/theme';

import FiltersPanel from '../FiltersPanel';

const defaultProps = {
  selectedCategories: [] as const,
  onCategoriesChange: vi.fn(),
  needsRevision: false,
  onNeedsRevisionChange: vi.fn(),
  onReset: vi.fn(),
};

const renderPanel = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <FiltersPanel {...defaultProps} {...props} />
    </ThemeProvider>
  );

describe('FiltersPanel', () => {
  it('renders title', () => {
    renderPanel();
    expect(screen.getByText('Фильтры')).toBeInTheDocument();
  });

  it('renders all category checkboxes', async () => {
    renderPanel();
    const expandButton = screen.getByLabelText('show more');
    await userEvent.click(expandButton);
    expect(screen.getByText('Авто')).toBeInTheDocument();
    expect(screen.getByText('Электроника')).toBeInTheDocument();
    expect(screen.getByText('Недвижимость')).toBeInTheDocument();
  });

  it('shows checked state for selected categories', async () => {
    renderPanel({ selectedCategories: ['electronics'] });
    const expandButton = screen.getByLabelText('show more');
    await userEvent.click(expandButton);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  it('calls onCategoriesChange with added category when unchecked is clicked', async () => {
    const onCategoriesChange = vi.fn();
    renderPanel({ selectedCategories: [], onCategoriesChange });
    const expandButton = screen.getByLabelText('show more');
    await userEvent.click(expandButton);
    await userEvent.click(screen.getByText('Авто'));
    expect(onCategoriesChange).toHaveBeenCalledWith(['auto']);
  });

  it('calls onCategoriesChange without category when checked is clicked', async () => {
    const onCategoriesChange = vi.fn();
    renderPanel({ selectedCategories: ['auto'], onCategoriesChange });
    const expandButton = screen.getByLabelText('show more');
    await userEvent.click(expandButton);
    await userEvent.click(screen.getByText('Авто'));
    expect(onCategoriesChange).toHaveBeenCalledWith([]);
  });

  it('renders needs revision toggle', () => {
    renderPanel();
    expect(screen.getByText('Только требующие доработок')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('toggle reflects needsRevision prop', () => {
    renderPanel({ needsRevision: true });
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeChecked();
  });

  it('calls onNeedsRevisionChange when toggle clicked', async () => {
    const onNeedsRevisionChange = vi.fn();
    renderPanel({ onNeedsRevisionChange });
    const toggle = screen.getByRole('switch');
    await userEvent.click(toggle);
    expect(onNeedsRevisionChange).toHaveBeenCalledWith(true);
  });

  it('renders reset button', () => {
    renderPanel();
    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
  });

  it('calls onReset when reset button clicked', async () => {
    const onReset = vi.fn();
    renderPanel({ onReset });
    await userEvent.click(screen.getByText('Сбросить фильтры'));
    expect(onReset).toHaveBeenCalledOnce();
  });
});
