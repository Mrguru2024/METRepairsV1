import type { Meta, StoryObj } from '@storybook/react';
import HeaderNav from './index';

const meta: Meta<typeof HeaderNav> = { title: 'Components/HeaderNav', component: HeaderNav };
export default meta;
type Story = StoryObj<typeof HeaderNav>;

export const Default: Story = { render: () => <HeaderNav /> };

