import type { Preview } from "@storybook/nextjs";
import { sansation, ibmPlexSerif } from "../src/styles/fonts";
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
      <div className={`${sansation.variable} ${ibmPlexSerif.variable}`}>
        <Story />
      </div>
    ),
  ],
  async beforeEach() {
    document.body.classList.add(sansation.variable, ibmPlexSerif.variable);
  },
};

export default preview;
