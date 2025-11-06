import type { Meta, StoryObj } from '@storybook/react';
import TestimonialCarousel from './index';

const meta: Meta<typeof TestimonialCarousel> = {
  title: 'Components/TestimonialCarousel',
  component: TestimonialCarousel,
};
export default meta;
type Story = StoryObj<typeof TestimonialCarousel>;

export const Default: Story = {
  args: { items: [{ name: 'A. Johnson', quote: 'Fast response and clean install.' }] },
};

