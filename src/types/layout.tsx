import type { PropsWithChildren, ReactNode } from "react";

export type LayoutPropsWithModal = Readonly<
  PropsWithChildren<{
    modal: ReactNode;
  }>
>;

export type LayoutProps = Readonly<PropsWithChildren>;
