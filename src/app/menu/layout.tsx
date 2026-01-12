import type { Metadata } from "next";
import type { LayoutPropsWithModal } from "~/types";

export default function MenuLayout({ children, modal }: LayoutPropsWithModal) {
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
