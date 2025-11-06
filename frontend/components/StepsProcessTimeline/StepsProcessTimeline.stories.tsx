import type { Meta, StoryObj } from '@storybook/react';
import StepsProcessTimeline from './index';

const meta: Meta<typeof StepsProcessTimeline> = {
  title: 'Components/StepsProcessTimeline',
  component: StepsProcessTimeline,
};
export default meta;
type Story = StoryObj<typeof StepsProcessTimeline>;

export const Default: Story = { render: () => <StepsProcessTimeline /> };

