import type { Meta, StoryObj } from '@storybook/react';

import { Error } from './Error';

const meta = {
  component: Error,
} satisfies Meta<typeof Error>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "message"
  }
};