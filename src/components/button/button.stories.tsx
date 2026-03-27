import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";
import ListAltCheck from "@/assets/icons/list-alt-check.svg";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "icon"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Action",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Action",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Tertiary Action",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Action",
  },
};

export const Icon: Story = {
  args: {
    variant: "icon",
    children: <ListAltCheck />,
  },
};
