import type { Meta, StoryObj } from "@storybook/nextjs";
import { Card, CardTitle, CardDescription, CardFooter } from "./card";
import { Button } from "@/components/button/button";
import ListAltCheck from "@/assets/icons/list-alt-check.svg";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "completed", "result"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} variant="default">
      <CardTitle>Card Title</CardTitle>
      <CardDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis et
        obcaecati molestias vero iure quos in, eaque aliquam unde molestiae
        facere, quis dignissimos ratione, cumque aut exercitationem labore
        quidem inventore.
      </CardDescription>
      <CardFooter>
        <span># questions</span>
        <Button variant="icon">
          <ListAltCheck />
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Completed: Story = {
  render: (args) => (
    <Card {...args} variant="completed">
      <CardTitle>Card Title</CardTitle>
      <CardDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis et
        obcaecati molestias vero iure quos in, eaque aliquam unde molestiae
        facere, quis dignissimos ratione, cumque aut exercitationem labore
        quidem inventore.
      </CardDescription>
    </Card>
  ),
};

export const Result: Story = {
  render: (args) => (
    <Card {...args} variant="result">
      <CardTitle>Card Title</CardTitle>
      <CardDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis et
        obcaecati molestias vero iure quos in, eaque aliquam unde molestiae
        facere, quis dignissimos ratione, cumque aut exercitationem labore
        quidem inventore.
      </CardDescription>
      <CardFooter>
        <span>3 questions are completed</span>
        <Button variant="icon">
          <ListAltCheck />
        </Button>
      </CardFooter>
    </Card>
  ),
};
