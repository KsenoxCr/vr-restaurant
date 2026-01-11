"use client";

import Image from "next/image";
import { QuantityPicker } from "~/app/_components/cart/quantity-picker";
import { RemoveButton } from "./remove-button";
import { formatCents } from "~/lib/utils/shared";
import { Typography } from "~/app/_components/ui/typography";
import {
  useCartStore,
  type CartItem as CartItemType,
} from "~/stores/cart-store";
import { CircleX } from "lucide-react";

export function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-dark-gray">
      {/* Upper row: Image, Name, Price */}
      <div className="flex gap-4 items-center">
        <div className="flex overflow-hidden relative flex-shrink-0 justify-center items-center w-16 h-16 rounded-lg bg-dark">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <CircleX className="w-8 h-8 text-color text-gray" />
          )}
        </div>

        <div className="flex flex-col flex-1">
          <Typography as="h3" variant="heading-3">
            {item.name}
          </Typography>
          <Typography variant="body-sm" color="accent-light">
            {formatCents(item.priceCents)}
          </Typography>
        </div>
      </div>

      {/* Lower row: Quantity picker, Delete button, Total price */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <QuantityPicker
            quantity={item.quantity}
            setQuantity={(newQuantity) =>
              updateQuantity(item.menuItemId, newQuantity)
            }
            max={10}
            isLarge={false}
            showLabel={false}
          />
          <RemoveButton onClick={() => removeItem(item.menuItemId)} />
        </div>

        <Typography size="base" weight="medium">
          {formatCents(item.priceCents * item.quantity)}
        </Typography>
      </div>
    </div>
  );
}
