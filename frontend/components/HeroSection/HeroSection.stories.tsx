import type { Meta, StoryObj } from '@storybook/react';
import HeroSection from './index';

const meta: Meta<typeof HeroSection> = { title: 'Components/HeroSection', component: HeroSection };
export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    headline: 'One trusted team for Locksmithing, Electrical, and Systems',
    subcopy: 'Book service, request a quote, or get help now across Metro Atlanta.',
    primaryHref: '/booking',
    secondaryHref: '/quote',
  },
};

