import type { Meta, StoryObj } from '@storybook/react';
import ProjectCard from './index';

const meta: Meta<typeof ProjectCard> = { title: 'Components/ProjectCard', component: ProjectCard };
export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: { title: 'Office access control retrofit', outcome: 'Keypads + readers, door strike' },
};

