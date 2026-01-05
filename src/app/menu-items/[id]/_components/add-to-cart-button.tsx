"use client";

import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { formatCents } from "~/lib/utils/price";
import { useCartStore } from "~/stores/cart-store";
import { useRouter } from "next/navigation";
import { navigateBack } from "~/lib/utils/navigation";
import { Button } from "~/app/_components/ui/button";

export function AddToCartButton({
  id,
  name,
  priceCents,
  imageUrl,
  quantity,
}: {
  id: number;
  name: string;
  priceCents: number;
  imageUrl: string | null;
  quantity: number;
}) {
  const [total, setTotal] = useState(priceCents);
  const addItem = useCartStore((state) => state.addItem);

  const router = useRouter();

  useEffect(() => {
    setTotal(priceCents * quantity);
  }, [quantity, priceCents]);

  const handleAddToCart = () => {
    addItem({
      menuItemId: id,
      name,
      priceCents,
      imageUrl,
      quantity,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <Button
        onClick={() => {
          handleAddToCart();
          navigateBack(router, "/menu");
        }}
        rounded="xl"
        className="gap-2 w-full"
      >
        <ShoppingCart className="w-6 h-6" />
        {`Add to Cart - ${formatCents(total)}`}
      </Button>
    </div>
  );
}
