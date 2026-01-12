import { Metadata } from "next";
import { LayoutPropsWithModal } from "~/types";

export default function KitchenLayout({
  children,
  modal,
}: LayoutPropsWithModal) {
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
