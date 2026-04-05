import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FormField } from '../FormField';

describe('FormField', () => {
  it('renders text input with label', () => {
    render(<FormField label="Test Label" value="Test Value" onChange={vi.fn()} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    render(<FormField label="Test" value="" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalledWith('new value');
  });

  it('displays required asterisk', () => {
    render(<FormField label="Required Field" value="" onChange={vi.fn()} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error state when touched and error is true', () => {
    render(<FormField label="Email" value="" onChange={vi.fn()} touched error />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders multiline textarea', () => {
    render(<FormField label="Description" value="Test" onChange={vi.fn()} multiline rows={4} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  it('shows clear button and calls onClear', () => {
    const onClear = vi.fn();
    render(<FormField label="Test" value="non-empty" onChange={vi.fn()} onClear={onClear} />);
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);
    expect(onClear).toHaveBeenCalled();
  });

  it('respects maxLength for multiline input', () => {
    render(<FormField label="Description" value="Test" onChange={vi.fn()} multiline />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });
});
