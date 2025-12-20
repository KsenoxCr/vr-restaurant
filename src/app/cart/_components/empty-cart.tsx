"use client";

import { Button } from "~/app/_components/ui/button";

type EmptyCartProps = {
  onBrowseMenu: () => void;
};

export function EmptyCart({ onBrowseMenu }: EmptyCartProps) {
  return (
    <div className="w-[40%]">
      <p className="text-center">Your cart is empty.</p>
      <Button className="mt-5 w-full" onClick={onBrowseMenu}>
        Browse Menu
      </Button>
    </div>
  );
}
