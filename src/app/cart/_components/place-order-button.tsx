"use client";

import { Button } from "~/components/ui/button";

type PlaceOrderButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export function PlaceOrderButton({
  onClick,
  disabled = false,
}: PlaceOrderButtonProps) {
  return (
    <Button
      size="lg"
      onClick={onClick}
      disabled={disabled}
      className="w-full font-medium"
    >
      Place Order
    </Button>
  );
}
