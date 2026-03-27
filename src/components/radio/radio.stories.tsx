import type { Meta, StoryObj } from "@storybook/nextjs";
import { Radio } from "./radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => (
    <>
      <Radio {...args} name="demo">
        label with long text
      </Radio>
      <Radio {...args} name="demo">
        label with very long text
      </Radio>
    </>
  ),
};
