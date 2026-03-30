import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
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
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Primary Action",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    label: "Tertiary Action",
  },
};
