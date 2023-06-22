import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './index';
import { FiHome, FiMail } from 'react-icons/fi';

const meta: Meta<typeof Input> = {
  title: 'ATOMS/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    endDecorator: <FiMail />,
    placeholder: 'Type here',
  },
};
