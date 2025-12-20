"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "~/stores/cart-store";
import { Button } from "~/components/ui/button";

export function CartButton() {
  const itemCount = useCartStore((state) => state.getTotalItems());

  return (
    <Button variant="ghost" active={false} className="relative" asChild>
      <Link href="/cart">
        <ShoppingCart className="w-8 h-8 transition-colors" />
        {itemCount > 0 && (
          <span className="flex absolute bottom-7 left-8 justify-center items-center p-1 text-xs font-semibold text-white bg-green-600 rounded-full transition-colors min-w-6 group-active:bg-green-700 group-active:text-neutral-400">
            {itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
