import { render, screen } from '@testing-library/react';
import FAQAccordion from './index';

it('renders FAQ items', () => {
  render(<FAQAccordion items={[{ q: 'Q1', a: 'A1' }]} />);
  expect(screen.getByText('Q1')).toBeInTheDocument();
});

