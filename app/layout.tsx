import { Toaster } from "@/components/ui/sonner";
import { ConfirmDialogProvider } from "@/lib/providers/confirm-dialog-provider";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import EventListenerProvider from "@/lib/providers/event-bus-listener-provider";

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
            <ConfirmDialogProvider>
              {children}
              <Toaster theme="dark" position="bottom-center" />
              <EventListenerProvider />
            </ConfirmDialogProvider>
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
