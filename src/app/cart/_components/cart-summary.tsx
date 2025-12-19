"use client";

import { formatCents } from "~/utils/price";

type CartSummaryProps = {
  totalPrice: number;
};

export function CartSummary({ totalPrice }: CartSummaryProps) {
  return (
    <div className="flex justify-between items-center pt-4 text-xl border-t border-neutral-700">
      <span className="text-neutral-400">Total</span>
      <span className="font-semibold text-green-500">
        {formatCents(totalPrice)}
      </span>
    </div>
  );
}
