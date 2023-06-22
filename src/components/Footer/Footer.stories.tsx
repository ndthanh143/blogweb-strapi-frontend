import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './index';
import { FiHome, FiMail } from 'react-icons/fi';

const meta: Meta<typeof Footer> = {
  title: 'PROVIDER/Footer',
  component: Footer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
