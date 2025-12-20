"use client";

import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { formatCents } from "~/utils/price";
import { useCartStore } from "~/stores/cart-store";
import { useRouter } from "next/navigation";
import { navigateBack } from "~/utils/navigation";
import { Button } from "~/components/ui/button";

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
    <div className="flex justify-center items-center mx-4 mb-2">
      <Button
        onClick={() => {
          handleAddToCart();
          navigateBack(router, "/menu-view");
        }}
        rounded="xl"
        className="w-full gap-2 mb-4 shadow-lg"
      >
        <ShoppingCart className="w-6 h-6 transition-all group-active:-translate-x-1 group-active:scale-105" />
        <span className="transition-all group-active:scale-105">{`Add to Cart - ${formatCents(total)}`}</span>
      </Button>
    </div>
  );
}
