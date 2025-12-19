"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "~/stores/cart-store";

export function CartButton() {
  const itemCount = useCartStore((state) => state.getTotalItems());

  return (
    <Link
      href="/cart"
      className="relative m-4 text-green-600 active:text-green-700 transition-color group"
    >
      <ShoppingCart className="w-8 h-8" />
      {itemCount > 0 && (
        <span className="flex absolute bottom-4 left-4 justify-center items-center p-1 text-xs font-semibold text-white bg-green-600 rounded-full min-w-6 group-active:bg-green-700 group-active:text-neutral-400">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
