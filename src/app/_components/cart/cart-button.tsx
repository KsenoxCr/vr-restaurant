"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "~/stores/cart-store";
import { Button } from "~/app/_components/ui/button";
import { Text } from "~/app/_components/ui/text";

export function CartButton() {
  const itemCount = useCartStore((state) => state.getTotalItems());

  return (
    <Button variant="ghost" active={false} className="relative" asChild>
      <Link href="/cart">
        <ShoppingCart className="w-8 h-8 transition-colors" />
        {itemCount > 0 && (
          <Text
            variant="badge"
            className="flex absolute bottom-7 left-8 justify-center items-center p-1 rounded-full transition-colors bg-accent group-active:bg-accent-dark group-active:text-off-white-dark min-w-6"
          >
            {itemCount}
          </Text>
        )}
      </Link>
    </Button>
  );
}
