import type { Meta, StoryObj } from "@storybook/nextjs";
import { RatingGroup } from "./rating-group";

const meta: Meta<typeof RatingGroup> = {
  title: "Components/RatingGroup",
  component: RatingGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RatingGroup>;

export const Default: Story = {
  render: (args) => <RatingGroup {...args} max={5} />,
};

export const WithValue: Story = {
  args: {
    value: 2,
  },

  render: (args) => <RatingGroup {...args} max={5} />,
};
