import { render, screen } from '@testing-library/react';
import StepsProcessTimeline from './index';

it('renders steps', () => {
  render(<StepsProcessTimeline />);
  expect(screen.getByText(/Step 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Assess/i)).toBeInTheDocument();
});

