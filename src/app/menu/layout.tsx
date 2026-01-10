import { Metadata } from "next";
import React from "react";
import { LayoutProps } from "~/types";

export default function MenuLayout({ children, modal }: LayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse Products",
};
