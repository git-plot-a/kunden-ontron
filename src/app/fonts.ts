import localFont from "next/font/local";

export const poppins = localFont({
  src: [
    { path: "../fonts/Poppins-Bold.ttf", weight: "700" },
    { path: "../fonts/Poppins-Light.ttf", weight: "300" },
    { path: "../fonts/Poppins-Medium.ttf", weight: "500" },
    { path: "../fonts/Poppins-Regular.ttf", weight: "400" },
    { path: "../fonts/Poppins-SemiBold.ttf", weight: "600" },
  ],
  variable: '--font-poppins'
});
