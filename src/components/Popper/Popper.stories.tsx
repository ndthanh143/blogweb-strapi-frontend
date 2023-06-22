import type { Meta, StoryObj } from '@storybook/react';
import { Popper } from './index';

const meta: Meta<typeof Popper> = {
  title: 'ATOMS/Popper',
  component: Popper,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popper>;

export const Default: Story = {};
