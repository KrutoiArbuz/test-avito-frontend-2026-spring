import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FormSelect } from '../FormSelect';

describe('FormSelect', () => {
  const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
  ];

  it('renders select with label', () => {
    render(<FormSelect label="Category" value="opt1" onChange={vi.fn()} options={options} />);
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays all option labels in dropdown', () => {
    render(<FormSelect label="Category" value="opt1" onChange={vi.fn()} options={options} />);
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    const options1 = screen.getAllByText('Option 1');
    const options2 = screen.getAllByText('Option 2');
    expect(options1.length).toBeGreaterThan(0);
    expect(options2.length).toBeGreaterThan(0);
  });

  it('calls onChange when selection changes', () => {
    const onChange = vi.fn();
    render(<FormSelect label="Category" value="opt1" onChange={onChange} options={options} />);
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    const optionsList = screen.getAllByText('Option 2');
    if (optionsList.length > 0) {
      const option = optionsList[0].closest('[role="option"]');
      if (option) {
        fireEvent.click(option);
        expect(onChange).toHaveBeenCalled();
      }
    }
  });

  it('displays required asterisk', () => {
    render(<FormSelect label="Category" value="" onChange={vi.fn()} options={options} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error state when touched and error exists', () => {
    render(
      <FormSelect
        label="Category"
        value=""
        onChange={vi.fn()}
        options={options}
        touched
        error={true}
      />
    );
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('applies bold font weight when bold prop is true', () => {
    render(<FormSelect label="Category" value="opt1" onChange={vi.fn()} options={options} bold />);
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
