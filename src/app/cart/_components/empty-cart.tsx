"use client";

import { Button } from "~/app/_components/ui/button";
import { Text } from "~/app/_components/ui/text";

type EmptyCartProps = {
  onBrowseMenu: () => void;
};

export function EmptyCart({ onBrowseMenu }: EmptyCartProps) {
  return (
    <div className="w-[40%]">
      <Text as="p" variant="body" className="text-center">
        Your cart is empty.
      </Text>
      <Button className="mt-5 w-full" onClick={onBrowseMenu}>
        Browse Menu
      </Button>
    </div>
  );
}
