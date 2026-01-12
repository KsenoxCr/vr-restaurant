import { Metadata } from "next";
import { LayoutPropsWithModal } from "~/types";

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
