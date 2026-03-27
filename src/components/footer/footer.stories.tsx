import type { Meta, StoryObj } from "@storybook/nextjs";
import { Footer } from "./footer";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    data: {
      copyright: "Q - All rights reserved 2026.",
      links: [
        {
          name: "Privacy Policy",
          url: "#",
        },
        {
          name: "Terms of Use",
          url: "#",
        },
      ],
    },
  },
  render: (args) => <Footer {...args}></Footer>,
};
