import { render, screen } from '@testing-library/react';
import ServiceCardGrid from './index';

it('renders service items', () => {
  render(
    <ServiceCardGrid
      items={[
        { title: 'Locksmith', href: '/services/locksmithing', description: 'desc' },
        { title: 'Electrical', href: '/services/electrical', description: 'desc' },
      ]}
    />
  );
  expect(screen.getByText(/Locksmith/i)).toBeInTheDocument();
  expect(screen.getByText(/Electrical/i)).toBeInTheDocument();
});

