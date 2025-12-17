"use client";

import { AddToCartButton } from "./add-to-cart-button";
import { QuantityPicker } from "./quantity-picker";
import { useState } from "react";

export function PurchasePanel({
  priceCents,
  maxQuantity = 10,
}: {
  priceCents: number;
  maxQuantity: number;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <QuantityPicker
        quantity={quantity}
        setQuantity={setQuantity}
        max={maxQuantity}
      />
      <AddToCartButton priceCents={priceCents} quantity={quantity} />
    </>
  );
}
