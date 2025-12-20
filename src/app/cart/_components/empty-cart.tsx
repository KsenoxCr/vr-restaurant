"use client";

import { Button } from "~/components/ui/button";

type EmptyCartProps = {
  onBrowseMenu: () => void;
};

export function EmptyCart({ onBrowseMenu }: EmptyCartProps) {
  return (
    <div className="w-[40%]">
      <p className="text-center">Your cart is empty.</p>
      <Button className="mt-5 w-full" onClick={onBrowseMenu}>
        <span className="group-active:scale-105 group-active:text-neutral-400">
          Browse Menu
        </span>
      </Button>
    </div>
  );
}
