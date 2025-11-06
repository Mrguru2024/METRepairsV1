import { render, screen } from '@testing-library/react';
import HeroSection from './index';

it('renders headline and buttons', () => {
  render(
    <HeroSection headline="Headline" subcopy="Sub" primaryHref="/booking" secondaryHref="/quote" />
  );
  expect(screen.getByText('Headline')).toBeInTheDocument();
  expect(screen.getByText('Book Now')).toBeInTheDocument();
  expect(screen.getByText('Get a Quote')).toBeInTheDocument();
});

