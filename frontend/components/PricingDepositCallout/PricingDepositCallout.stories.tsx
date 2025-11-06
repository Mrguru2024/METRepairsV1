import type { Meta, StoryObj } from '@storybook/react';
import PricingDepositCallout from './index';

const meta: Meta<typeof PricingDepositCallout> = {
  title: 'Components/PricingDepositCallout',
  component: PricingDepositCallout,
};
export default meta;
type Story = StoryObj<typeof PricingDepositCallout>;

export const Default: Story = { render: () => <PricingDepositCallout /> };

