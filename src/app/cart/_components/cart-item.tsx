"use client";

import Image from "next/image";
import { QuantityPicker } from "~/app/_components/quantity-picker";
import { RemoveButton } from "./remove-button";
import { formatCents } from "~/utils/price";
import type { CartItem as CartItemType } from "~/stores/cart-store";

type CartItemProps = {
  item: CartItemType;
  onUpdateQuantity: (menuItemId: number, quantity: number) => void;
  onRemove: (menuItemId: number) => void;
};

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg bg-neutral-800">
      {/* Upper row: Image, Name, Price */}
      <div className="flex gap-3 items-center">
        <div className="overflow-hidden relative flex-shrink-0 w-16 h-16 rounded-lg bg-neutral-700">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-full text-neutral-500">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1">
          <h3 className="text-base text-white">{item.name}</h3>
          <p className="text-sm text-green-500">
            {formatCents(item.priceCents)}
          </p>
        </div>
      </div>

      {/* Lower row: Quantity picker, Delete button, Total price */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <QuantityPicker
            quantity={item.quantity}
            setQuantity={(newQuantity) =>
              onUpdateQuantity(item.menuItemId, newQuantity)
            }
            max={10}
            isLarge={false}
            showLabel={false}
          />
          <RemoveButton onClick={() => onRemove(item.menuItemId)} />
        </div>

        <div className="text-base font-medium text-white">
          {formatCents(item.priceCents * item.quantity)}
        </div>
      </div>
    </div>
  );
}
