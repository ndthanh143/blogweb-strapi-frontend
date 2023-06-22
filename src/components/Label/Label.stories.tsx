import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './index';

const meta: Meta<typeof Label> = {
  title: 'ATOMS/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Technology',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Technology',
  },
};
