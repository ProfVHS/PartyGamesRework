import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  component: Button,
  parameters: {
    controls: {
      exclude: ['className', 'onClick', 'style'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimarySquare: Story = {
  args: {
    className: '',
    children: 'Button',
    variant: 'square',
    isDisabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export const RemoveSquare: Story = {
  args: {
    className: '',
    children: 'Button',
    variant: 'square',
    isDisabled: false,
    color: 'remove',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export const PrimaryRound: Story = {
  args: {
    className: '',
    children: 'Button',
    variant: 'round',
    isDisabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export const RemoveRound: Story = {
  args: {
    className: '',
    children: 'Button',
    variant: 'round',
    isDisabled: false,
    color: 'remove',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};
