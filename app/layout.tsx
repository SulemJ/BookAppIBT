import type { Metadata } from "next";
import "./globals.css";
import CartNav from "./CartNav";

export const metadata: Metadata = {
  title: "CodeOps Book Store",
  description: "Browse books and manage your shopping cart.",
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
