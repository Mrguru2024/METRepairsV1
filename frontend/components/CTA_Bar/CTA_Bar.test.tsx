import { render, screen } from '@testing-library/react';
import CTABar from './index';

it('renders CTA buttons', () => {
  render(<CTABar />);
  expect(screen.getByText('Call')).toBeInTheDocument();
  expect(screen.getByText('Book')).toBeInTheDocument();
  expect(screen.getByText('Quote')).toBeInTheDocument();
});

