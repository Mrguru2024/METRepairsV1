import { render, screen } from '@testing-library/react';
import TestimonialCarousel from './index';

it('renders testimonials', () => {
  render(<TestimonialCarousel items={[{ name: 'Test', quote: 'Great!' }]} />);
  expect(screen.getByText(/Great!/i)).toBeInTheDocument();
});

