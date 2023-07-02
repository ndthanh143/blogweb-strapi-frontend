import type { Meta, StoryObj } from '@storybook/react';
import { DropZone } from './index';

const meta: Meta<typeof DropZone> = {
  title: 'PROVIDER/DropZone',
  component: DropZone,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DropZone>;

export const Default: Story = {
  args: {},
};
