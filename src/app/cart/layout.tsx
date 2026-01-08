import { Metadata } from "next";
import React from "react";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "Cart",
  description: "Preview & submit order",
};
