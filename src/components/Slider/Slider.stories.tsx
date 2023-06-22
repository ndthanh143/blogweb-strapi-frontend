import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './index';

const meta: Meta<typeof Slider> = {
  title: 'PROVIDER/Slider',
  component: Slider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  // args: {
  //     data: [
  //         {
  //             thumbnail: 'https://www.gohawaii.com/sites/default/files/hero-unit-images/11500_mauibeaches.jpg',
  //             category: 'Technology',
  //             title: 'The Impact of Technology on the Workplace: How Technology is Changing',
  //             // createdAt: 'August 20, 2022',
  //         },
  //     ],
  // },
};
