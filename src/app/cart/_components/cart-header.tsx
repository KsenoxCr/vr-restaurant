"use client";

type CartHeaderProps = {
  seatNumber: string;
};

export function CartHeader({ seatNumber }: CartHeaderProps) {
  return (
    <div className="text-lg">
      <span className="text-neutral-400">Delivering to: </span>
      <span className="text-green-500">Seat {seatNumber}</span>
    </div>
  );
}
