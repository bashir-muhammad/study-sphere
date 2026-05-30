import type { Meta, StoryObj } from "@storybook/nextjs";

import { MainNav } from "./main-nav";

const meta = {
  component: MainNav,
  parameters: {
    layout: "padded",
    backgrounds: { default: "white" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MainNav>;

export default meta;

type Story = StoryObj<typeof MainNav>;

export const Default: Story = {
  render: () => (
    <MainNav
      links={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ]}
    />
  ),
};
