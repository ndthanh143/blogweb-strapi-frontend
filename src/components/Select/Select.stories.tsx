import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './index';

const meta: Meta<typeof Select> = {
  title: 'PROVIDER/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
