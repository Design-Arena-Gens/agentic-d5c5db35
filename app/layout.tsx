import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Air - Brand Asset Management",
  description: "Google Drive for brands - manage your static and video ads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
