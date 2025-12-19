"use client";

import { AddToCartButton } from "./add-to-cart-button";
import { QuantityPicker } from "./quantity-picker";
import { useState } from "react";

export function PurchasePanel({
  id,
  name,
  priceCents,
  imageUrl,
  maxQuantity = 10,
}: {
  id: string;
  name: string;
  priceCents: number;
  imageUrl: string | null;
  maxQuantity: number;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <QuantityPicker
        isLarge
        quantity={quantity}
        setQuantity={setQuantity}
        max={maxQuantity}
      />
      <AddToCartButton
        id={id}
        name={name}
        priceCents={priceCents}
        imageUrl={imageUrl}
        quantity={quantity}
      />
    </>
  );
}
