import { Metadata } from "next";
import React from "react";
import { LayoutProps } from "~/types";

export default function MenuLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "Cart",
  description: "Preview & submit order",
};
