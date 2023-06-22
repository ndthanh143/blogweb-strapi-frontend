import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './index';

const meta: Meta<typeof Pagination> = {
  title: 'ATOMS/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};
