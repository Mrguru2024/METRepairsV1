import type { Meta, StoryObj } from '@storybook/react';
import CTABar from './index';

const meta: Meta<typeof CTABar> = { title: 'Components/CTABar', component: CTABar };
export default meta;
type Story = StoryObj<typeof CTABar>;

export const Default: Story = { render: () => <CTABar /> };

