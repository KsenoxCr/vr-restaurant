"use client";

import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { formatCents } from "~/utils/price";

export function AddToCartButton({
  priceCents,
  quantity,
}: {
  priceCents: number;
  quantity: number;
}) {
  const [total, setTotal] = useState(priceCents);

  useEffect(() => {
    setTotal(priceCents * quantity);
  }, [quantity]);

  return (
    <div className="flex justify-center items-center mx-4 mb-2">
      <button className="flex gap-2 justify-center items-center p-4 mb-4 w-full bg-green-600 rounded-xl shadow-lg transition-all active:bg-green-700 active:scale-105 group active:text-neutral-400">
        <ShoppingCart className="w-6 h-6 transition-all group-active:-translate-x-1 group-active:scale-105" />
        <span className="transition-all group-active:scale-105">{`Add to Cart - ${formatCents(total)}`}</span>
      </button>
    </div>
  );
}
