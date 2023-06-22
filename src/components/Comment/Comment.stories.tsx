import type { Meta, StoryObj } from '@storybook/react';
import { Comment } from './index';

const meta: Meta<typeof Comment> = {
  title: 'PROVIDER/Comment',
  component: Comment,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
  args: {},
};
