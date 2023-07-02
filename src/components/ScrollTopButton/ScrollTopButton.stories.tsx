import type { Meta, StoryObj } from '@storybook/react';
import { ScrollTopButton } from './index';

const meta: Meta<typeof ScrollTopButton> = {
  title: 'ATOMS/ScrollTopButton',
  component: ScrollTopButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollTopButton>;

export const Default: Story = {};
