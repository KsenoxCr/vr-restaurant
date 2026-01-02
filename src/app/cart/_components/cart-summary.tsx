"use client";

import { formatCents } from "~/lib/utils/price";
import { Text } from "~/app/_components/ui/text";
import { useCartStore } from "~/stores/cart-store";

export function CartSummary() {
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  return (
    <div className="flex justify-between items-center pt-4 text-xl border-t border-gray">
      <Text variant="muted">Total</Text>
      <Text weight="semibold" color="accent-light">
        {formatCents(getTotalPrice())}
      </Text>
    </div>
  );
}
