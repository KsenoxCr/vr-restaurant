"use client";

import { Typography } from "~/app/_components/ui/typography";

export function SeatDisplay({ seatNumber }: { seatNumber: string }) {
  return (
    <div className="text-lg">
      <Typography variant="muted">Delivering to: </Typography>
      <Typography color="accent-light">Seat {seatNumber}</Typography>
    </div>
  );
}
