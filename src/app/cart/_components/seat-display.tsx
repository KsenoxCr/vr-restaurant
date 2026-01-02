"use client";

import { Text } from "~/app/_components/ui/text";

export function SeatDisplay({ seatNumber }: { seatNumber: string }) {
  return (
    <div className="text-lg">
      <Text variant="muted">Delivering to: </Text>
      <Text color="accent-light">Seat {seatNumber}</Text>
    </div>
  );
}
