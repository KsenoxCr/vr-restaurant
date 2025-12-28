"use client";

import { formatCents } from "~/lib/utils/price";
import { Text } from "~/app/_components/ui/text";

type CartSummaryProps = {
  totalPrice: number;
};

export function CartSummary({ totalPrice }: CartSummaryProps) {
  return (
    <div className="flex justify-between items-center pt-4 text-xl border-t border-gray">
      <Text variant="muted">Total</Text>
      <Text weight="semibold" color="accent-light">
        {formatCents(totalPrice)}
      </Text>
    </div>
  );
}
