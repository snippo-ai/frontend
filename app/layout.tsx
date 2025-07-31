import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Snippo AI", template: "%s | Snippo AI" },
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ThemeProvider>
            {children}
            <Toaster theme="dark" position="bottom-center" />
          </ThemeProvider>
        </SessionProvider>
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>
      </body>
    </html>
  );
}
