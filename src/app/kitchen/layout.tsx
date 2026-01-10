import { Metadata } from "next";
import { LayoutProps } from "~/types";

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

export const metadata: Metadata = {
  title: "Kitchen",
  description: "Staff dashboard for managing orders",
};
