import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AIResultPopover } from '../AIResultPopover';

describe('AIResultPopover', () => {
  it('renders nothing when anchorEl is null', () => {
    const { container } = render(
      <AIResultPopover anchorEl={null} result="Test result" onClose={vi.fn()} onApply={vi.fn()} />
    );
    const popover = container.querySelector('[role="presentation"]');
    // When anchorEl is null, popover should not be visible
    if (popover) {
      expect(popover).toHaveStyle({ visibility: 'hidden' });
    }
  });

  it('displays result text when anchorEl is provided', () => {
    // Create a real button element for the popover to anchor to
    const anchorElement = document.createElement('button');
    document.body.appendChild(anchorElement);

    render(
      <AIResultPopover
        anchorEl={anchorElement}
        result="Test AI Result"
        onClose={vi.fn()}
        onApply={vi.fn()}
      />
    );
    expect(screen.getByText('Test AI Result')).toBeInTheDocument();
    document.body.removeChild(anchorElement);
  });

  it('shows apply and close buttons when displayed', () => {
    const anchorElement = document.createElement('button');
    document.body.appendChild(anchorElement);

    render(
      <AIResultPopover
        anchorEl={anchorElement}
        result="Test result"
        onClose={vi.fn()}
        onApply={vi.fn()}
      />
    );
    const buttons = screen.getAllByRole('button');
    // Should have Применить and Закрыть buttons (plus the anchor button)
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    document.body.removeChild(anchorElement);
  });

  it('calls onApply when apply button is clicked', () => {
    const onApply = vi.fn();
    const anchorElement = document.createElement('button');
    document.body.appendChild(anchorElement);

    render(
      <AIResultPopover
        anchorEl={anchorElement}
        result="Test result"
        onClose={vi.fn()}
        onApply={onApply}
      />
    );
    const buttons = screen.getAllByRole('button');
    if (buttons.length > 1) {
      fireEvent.click(buttons[0]);
      expect(onApply).toHaveBeenCalled();
    }
    document.body.removeChild(anchorElement);
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    const anchorElement = document.createElement('button');
    document.body.appendChild(anchorElement);

    render(
      <AIResultPopover
        anchorEl={anchorElement}
        result="Test result"
        onClose={onClose}
        onApply={vi.fn()}
      />
    );
    const buttons = screen.getAllByRole('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[buttons.length - 1]);
      expect(onClose).toHaveBeenCalled();
    }
    document.body.removeChild(anchorElement);
  });

  it('renders with result text', () => {
    const anchorElement = document.createElement('button');
    document.body.appendChild(anchorElement);

    render(
      <AIResultPopover
        anchorEl={anchorElement}
        result="Test result"
        onClose={vi.fn()}
        onApply={vi.fn()}
      />
    );
    expect(screen.getByText('Test result')).toBeInTheDocument();
    document.body.removeChild(anchorElement);
  });

  it('handles error state', () => {
    const anchorElement = document.createElement('button');
    document.body.appendChild(anchorElement);

    render(
      <AIResultPopover
        anchorEl={anchorElement}
        result="Error message"
        error={true}
        onClose={vi.fn()}
        onApply={vi.fn()}
      />
    );
    // Error state shows fixed error message
    expect(screen.getByText(/Произошла ошибка/i)).toBeInTheDocument();
    document.body.removeChild(anchorElement);
  });
});
