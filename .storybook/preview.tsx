import type { Preview } from "@storybook/nextjs";
import { plusJakartaSans, manrope } from "../src/styles/fonts";
import "@/styles/tokens.css";
import "@/styles/globals.css";
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`${plusJakartaSans.variable} ${manrope.variable}`}>
        <Story />
      </div>
    ),
  ],
  async beforeEach() {
    document.body.classList.add(plusJakartaSans.variable, manrope.variable);
  },
};

export default preview;
