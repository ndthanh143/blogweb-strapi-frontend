import type { Meta, StoryObj } from '@storybook/react';
import { SocialMedia } from './index';

const meta: Meta<typeof SocialMedia> = {
  title: 'ATOMS/SocialMedia',
  component: SocialMedia,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SocialMedia>;

export const Default: Story = {
  args: {
    variant: 'facebook',
    href: '/',
  },
};
