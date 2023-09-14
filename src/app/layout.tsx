import "./globals.css";
import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import Providers from "./providers";

const prompt = Prompt({
  subsets: ["latin", "latin-ext", "thai"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Virtual Park In Market",
  description: "Virtual Park In Market",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={prompt.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
