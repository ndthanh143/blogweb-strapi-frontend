import type { Meta, StoryObj } from '@storybook/react';
import { MiniNavigation } from './index';

const meta: Meta<typeof MiniNavigation> = {
  title: 'PROVIDER/MiniNavigation',
  component: MiniNavigation,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MiniNavigation>;

export const Default: Story = {};
