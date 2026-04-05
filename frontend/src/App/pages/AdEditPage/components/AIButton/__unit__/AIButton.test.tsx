import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AIButton } from '../AIButton';

describe('AIButton', () => {
  it('renders button with initial text when empty and no result', () => {
    render(
      <AIButton
        isLoading={false}
        hasValue={false}
        hasResult={false}
        onClick={vi.fn()}
        variant="description"
      />
    );
    expect(screen.getByRole('button')).toHaveTextContent('Придумать описание');
  });

  it('shows improve text when description exists but no result', () => {
    render(
      <AIButton
        isLoading={false}
        hasValue={true}
        hasResult={false}
        onClick={vi.fn()}
        variant="description"
      />
    );
    expect(screen.getByRole('button')).toHaveTextContent('Улучшить описание');
  });

  it('shows price market text for price variant', () => {
    render(
      <AIButton
        isLoading={false}
        hasValue={false}
        hasResult={false}
        onClick={vi.fn()}
        variant="price"
      />
    );
    expect(screen.getByRole('button')).toHaveTextContent('Узнать рыночную цену');
  });

  it('shows loading text when isLoading is true', () => {
    render(<AIButton isLoading={true} hasValue={false} hasResult={false} onClick={vi.fn()} />);
    expect(screen.getByRole('button')).toHaveTextContent('Выполняется запрос');
  });

  it('shows retry text when hasResult is true', () => {
    render(
      <AIButton
        isLoading={false}
        hasValue={true}
        hasResult={true}
        onClick={vi.fn()}
        variant="description"
      />
    );
    expect(screen.getByRole('button')).toHaveTextContent('Повторить запрос');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<AIButton isLoading={false} hasValue={false} hasResult={false} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('is disabled when loading', () => {
    render(<AIButton isLoading={true} hasValue={false} hasResult={false} onClick={vi.fn()} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('accepts custom sx styles', () => {
    const { container } = render(
      <AIButton
        isLoading={false}
        hasValue={false}
        hasResult={false}
        onClick={vi.fn()}
        sx={{ backgroundColor: 'blue' }}
      />
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });
});
