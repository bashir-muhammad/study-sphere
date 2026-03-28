import localFont from "next/font/local";

export const plusJakartaSans = localFont({
  src: [
    {
      path: "../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf",
      weight: "400, 500, 600, 700",
      style: "normal",
    },
  ],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const manrope = localFont({
  src: [
    {
      path: "../assets/fonts/Manrope-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});
