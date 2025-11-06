import type { Meta, StoryObj } from '@storybook/react';
import ServiceCardGrid from './index';

const meta: Meta<typeof ServiceCardGrid> = {
  title: 'Components/ServiceCardGrid',
  component: ServiceCardGrid,
};
export default meta;
type Story = StoryObj<typeof ServiceCardGrid>;

export const Default: Story = {
  args: {
    items: [
      { title: 'Locksmithing', href: '/services/locksmithing', description: 'Rekeys, smart locks' },
      { title: 'Electrical', href: '/services/electrical', description: 'Panels, lighting' },
      {
        title: 'Access Control',
        href: '/services/access-control',
        description: 'Keypads, readers',
      },
    ],
  },
};

