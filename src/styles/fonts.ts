import localFont from "next/font/local";

export const sansation = localFont({
  src: [
    {
      path: "../assets/fonts/Sansation-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Sansation-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sansation",
  display: "swap",
});

export const ibmPlexSerif = localFont({
  src: [
    {
      path: "../assets/fonts/IBMPlexSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex",
  display: "swap",
});
