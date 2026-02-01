import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hiring Oracle - AI-Powered Hiring System",
  description:
    "Build job positions, generate interview questions, evaluate candidates, and create onboarding plans aligned with your brand values. Part of The Master's Edge Business Program by Total Success AI.",
  authors: [{ name: "Total Success AI" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
