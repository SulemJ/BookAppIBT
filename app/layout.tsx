
import type { Metadata } from "next";
import "./globals.css";
import CartNav from "./CartNav";

export const metadata: Metadata = {
  title: "BookNest | Your Online Bookstore",
  description:
    "Discover your next favorite book at BookNest. Browse books, explore categories, and shop online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b p-4">
          <CartNav />
        </header>
        {children}
      </body>
    </html>
  );
}
