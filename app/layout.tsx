import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn Robotics | Robotics Presentation System",
  description: "A modern robotics presentation, review platform, and public showcase built with Next.js, TypeScript, Tailwind, and React Three Fiber.",
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
