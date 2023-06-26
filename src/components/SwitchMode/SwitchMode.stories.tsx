import type { Meta, StoryObj } from '@storybook/react';
import { SwitchMode } from './index';

const meta: Meta<typeof SwitchMode> = {
  title: 'ATOMS/SwitchMode',
  component: SwitchMode,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SwitchMode>;

export const Default: Story = {
  args: {},
};
