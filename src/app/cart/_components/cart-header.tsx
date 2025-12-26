"use client";

import { Text } from "~/app/_components/ui/text";

type CartHeaderProps = {
  seatNumber: string;
};

export function CartHeader({ seatNumber }: CartHeaderProps) {
  return (
    <div className="text-lg">
      <Text variant="muted">Delivering to: </Text>
      <Text color="accent-light">Seat {seatNumber}</Text>
    </div>
  );
}
