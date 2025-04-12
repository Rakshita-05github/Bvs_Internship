import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import ProviderLayout from "./Provider";

const inter = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forms by Rakshita",
  description: "Create Forms - A dynamic form to enter details",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}
