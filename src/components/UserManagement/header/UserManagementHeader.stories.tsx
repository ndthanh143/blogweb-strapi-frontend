import type { Meta, StoryObj } from '@storybook/react';
import UserManagementHeader from './UserManagementHeader';

const meta: Meta<typeof UserManagementHeader> = {
  title: 'ATOMS/UserManagementHeader',
  component: UserManagementHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserManagementHeader>;

export const Default: Story = {};
