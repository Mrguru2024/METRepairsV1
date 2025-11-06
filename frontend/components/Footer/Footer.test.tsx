import { render, screen } from '@testing-library/react';
import Footer from './index';

it('renders links', () => {
  render(<Footer />);
  expect(screen.getByText(/Contact/i)).toBeInTheDocument();
});

