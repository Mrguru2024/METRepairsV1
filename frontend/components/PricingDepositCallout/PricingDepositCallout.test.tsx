import { render, screen } from '@testing-library/react';
import PricingDepositCallout from './index';

it('renders transparent pricing copy', () => {
  render(<PricingDepositCallout />);
  expect(screen.getByText(/Transparent pricing/i)).toBeInTheDocument();
});

