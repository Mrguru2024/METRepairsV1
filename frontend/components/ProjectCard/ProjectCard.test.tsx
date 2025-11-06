import { render, screen } from '@testing-library/react';
import ProjectCard from './index';

it('renders project title', () => {
  render(<ProjectCard title="Title" outcome="Outcome" />);
  expect(screen.getByText('Title')).toBeInTheDocument();
});
