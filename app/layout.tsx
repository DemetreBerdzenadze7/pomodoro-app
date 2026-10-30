import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Pomodoro",
  description: "Pomodoro timer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${kumbhSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-navy-800 font-sans text-light">
        {children}
      </body>
    </html>
  );
}
