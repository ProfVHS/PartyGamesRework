import type { StoryObj, Meta } from '@storybook/react';
import { ClickTheBomb } from '../components/features/clickthebomb/ClickTheBomb';

const meta: Meta = {
  component: ClickTheBomb,
};

export default meta;
type Story = StoryObj<typeof ClickTheBomb>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};
