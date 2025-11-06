import type { Meta, StoryObj } from '@storybook/react';
import FAQAccordion from './index';

const meta: Meta<typeof FAQAccordion> = {
  title: 'Components/FAQAccordion',
  component: FAQAccordion,
};
export default meta;
type Story = StoryObj<typeof FAQAccordion>;

export const Default: Story = {
  args: { items: [{ q: 'Are you licensed?', a: 'Yes, fully licensed and insured.' }] },
};

