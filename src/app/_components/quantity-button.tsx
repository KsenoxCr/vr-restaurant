"use client";

import { Button } from "~/components/ui/button";

type QuantityButtonProps = {
  onClick: () => void;
  isIncrement: boolean;
  isLarge?: boolean;
  disabled?: boolean;
};

export function QuantityButton({
  onClick,
  isIncrement,
  isLarge = false,
  disabled = false,
}: QuantityButtonProps) {
  return (
    <Button
      variant={isIncrement ? "increment" : "decrement"}
      size={isLarge ? "icon-lg" : "icon"}
      rounded="full"
      active="intense"
      onClick={onClick}
      disabled={disabled}
    >
      {isIncrement ? "+" : "-"}
    </Button>
  );
}
