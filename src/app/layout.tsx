import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { MobileOnlyGate } from "~/app/_components/mobile-only-gate";
import React from "react";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).React = React;
}

export const metadata: Metadata = {
  title: "VR Restaurant",
  description: "Food Ordering App for Traing Restaurant Carriage",
  icons: [{ rel: "icon", url: "/icons/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <MobileOnlyGate>{children}</MobileOnlyGate>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
