import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './index';

const meta: Meta<typeof Avatar> = {
  title: 'ATOMS/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://image.nhandan.vn/1200x630/Uploaded/2023/yqjwcqjlq/2022_11_24/ronaldo-portugal-copy-1844.jpg',
    width: 500,
    height: 500,
    alt: 'cristiano ronaldo',
  },
};
