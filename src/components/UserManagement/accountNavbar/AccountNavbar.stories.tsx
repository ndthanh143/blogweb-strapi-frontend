import type { Meta, StoryObj } from '@storybook/react';
import AccountNavbar from './AccountNavbar';

const meta: Meta<typeof AccountNavbar> = {
  title: 'ATOMS/AccountNavbar',
  component: AccountNavbar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AccountNavbar>;

export const Default: Story = {};
