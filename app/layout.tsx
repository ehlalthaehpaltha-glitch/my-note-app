import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Note Taking App",
  description: "A modern note-taking application with Markdown support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
