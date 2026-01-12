import type { Metadata } from "next";
import type { LayoutProps } from "~/types";

export default function CartLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "Cart",
  description: "Preview & submit Order",
};
