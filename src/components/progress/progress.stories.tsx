import type { Meta, StoryObj } from "@storybook/nextjs";
import { Progress, ProgressLabel } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "tertiary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Primary: Story = {
  args: {
    value: "50%",
  },
  render: (args) => (
    <div>
      <ProgressLabel>
        Progress Label<span>{args.value}</span>
      </ProgressLabel>
      <Progress {...args} variant="primary" />
    </div>
  ),
};

export const Tertiary: Story = {
  args: {
    value: "75%",
  },
  render: (args) => (
    <div>
      <ProgressLabel>
        Progress Label<span>{args.value}</span>
      </ProgressLabel>
      <Progress {...args} variant="tertiary" />
    </div>
  ),
};
