import type { Meta, StoryObj } from '@storybook/react';

import { Camera } from './Camera';

const meta = {
  component: Camera,
} satisfies Meta<typeof Camera>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nickname: "nickname",
    score: 0,
    alive: true,
    isDisconnected: true
  }
};