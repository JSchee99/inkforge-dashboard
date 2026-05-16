import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/common/Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    test('renders with title and subtitle', () => {
      render(
        <Card title="Test Card" subtitle="Test subtitle">
          Content
        </Card>
      );
      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('Test subtitle')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    test('renders with status badge', () => {
      render(
        <Card title="Card" status="active">
          Content
        </Card>
      );
      expect(screen.getByText('active')).toBeInTheDocument();
    });

    test('renders children correctly', () => {
      render(
        <Card>
          <div>Child content</div>
        </Card>
      );
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });
  });

  describe('Clickable Cards', () => {
    test('clickable card has role="button"', () => {
      render(
        <Card title="Clickable" clickable>
          Content
        </Card>
      );
      const card = screen.getByRole('button');
      expect(card).toBeInTheDocument();
    });

    test('clickable card has tabindex="0"', () => {
      render(
        <Card title="Clickable" clickable>
          Content
        </Card>
      );
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabindex', '0');
    });

    test('clickable card has aria-label', () => {
      render(
        <Card title="Test Card" clickable>
          Content
        </Card>
      );
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-label', expect.stringContaining('Test Card'));
    });

    test('calls onClick when card is clicked', () => {
      const handleClick = jest.fn();
      render(
        <Card title="Card" clickable onClick={handleClick}>
          Content
        </Card>
      );
      const card = screen.getByRole('button');
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('calls onClick when Enter key is pressed', () => {
      const handleClick = jest.fn();
      render(
        <Card title="Card" clickable onClick={handleClick}>
          Content
        </Card>
      );
      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('calls onClick when Space key is pressed', () => {
      const handleClick = jest.fn();
      render(
        <Card title="Card" clickable onClick={handleClick}>
          Content
        </Card>
      );
      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onClick for other keys', () => {
      const handleClick = jest.fn();
      render(
        <Card title="Card" clickable onClick={handleClick}>
          Content
        </Card>
      );
      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'ArrowDown' });
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('has focus ring styling', () => {
      render(
        <Card title="Card" clickable>
          Content
        </Card>
      );
      const card = screen.getByRole('button');
      expect(card).toHaveClass('focus:ring-2');
      expect(card).toHaveClass('focus:ring-primary-500');
    });
  });

  describe('Status Variants', () => {
    test('renders active status', () => {
      render(
        <Card title="Card" status="active">
          Content
        </Card>
      );
      expect(screen.getByText('active')).toHaveClass('bg-success');
    });

    test('renders pending status', () => {
      render(
        <Card title="Card" status="pending">
          Content
        </Card>
      );
      expect(screen.getByText('pending')).toHaveClass('bg-warning');
    });

    test('renders completed status', () => {
      render(
        <Card title="Card" status="completed">
          Content
        </Card>
      );
      expect(screen.getByText('completed')).toHaveClass('bg-info');
    });

    test('renders failed status', () => {
      render(
        <Card title="Card" status="failed">
          Content
        </Card>
      );
      expect(screen.getByText('failed')).toHaveClass('bg-destructive');
    });
  });

  describe('Non-clickable Cards', () => {
    test('non-clickable card does not have role="button"', () => {
      const { container } = render(
        <Card title="Card" clickable={false}>
          Content
        </Card>
      );
      const button = container.querySelector('[role="button"]');
      expect(button).not.toBeInTheDocument();
    });

    test('non-clickable card does not have tabindex', () => {
      const { container } = render(
        <Card title="Card" clickable={false}>
          Content
        </Card>
      );
      const card = container.querySelector('[tabindex]');
      expect(card).not.toBeInTheDocument();
    });
  });
});
