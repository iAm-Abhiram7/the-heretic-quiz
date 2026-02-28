import type { Metadata } from "next";
import "./globals.css";
import ClientShell from "./ClientShell";

export const metadata: Metadata = {
  title: "The Heretic — A Gothic Trial",
  description: "A cinematic gothic movie quiz. Prove you understood the film.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
