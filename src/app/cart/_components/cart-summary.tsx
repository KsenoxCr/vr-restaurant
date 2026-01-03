"use client";

import { formatCents } from "~/lib/utils/price";
import { Typography } from "~/app/_components/ui/typography";
import { useCartStore } from "~/stores/cart-store";

export function CartSummary() {
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  return (
    <div className="flex justify-between items-center pt-4 text-xl border-t border-gray">
      <Typography variant="muted">Total</Typography>
      <Typography weight="semibold" color="accent-light">
        {formatCents(getTotalPrice())}
      </Typography>
    </div>
  );
}
