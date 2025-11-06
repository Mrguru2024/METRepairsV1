import { render, screen } from '@testing-library/react';
import HeaderNav from './index';

describe('HeaderNav', () => {
  it('renders brand and Book Now', () => {
    render(<HeaderNav />);
    expect(screen.getByText(/MET Repairs/i)).toBeInTheDocument();
    expect(screen.getByText(/Book Now/i)).toBeInTheDocument();
  });
});

