import "~/styles/globals.css";

import { Inter, IBM_Plex_Sans } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { MobileOnlyGate } from "~/app/_components/screen/mobile-only-gate";
import React, { Suspense } from "react";
import { LoadingScreen } from "./_components/screen/loading-page";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).React = React;
}

export const metadata: Metadata = {
  title: "VR Restaurant",
  description: "Food Ordering App for Traing Restaurant Carriage",
  icons: [{ rel: "icon", url: "/icons/favicon.ico" }],
};

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const ibmPlexSans = IBM_Plex_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`bg-gray ${ibmPlexSans.variable} ${inter.variable} ${inter.className}`}
    >
      <body>
        <TRPCReactProvider>
          <MobileOnlyGate>
            <Suspense fallback={<LoadingScreen color="gray" />}>
              {children}
            </Suspense>
          </MobileOnlyGate>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
