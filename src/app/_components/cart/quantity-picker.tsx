"use client";

import { QuantityButton } from "./quantity-button";
import { Text } from "~/app/_components/ui/text";

export function QuantityPicker({
  isLarge,
  quantity,
  setQuantity,
  max,
  showLabel = true,
}: {
  isLarge?: boolean;
  quantity: number;
  setQuantity: (newQuantity: number) => void;
  max: number;
  showLabel?: boolean;
}) {
  const changeQuantity = (delta: number) => {
    setQuantity(Math.min(Math.max(quantity + delta, 1), max));
  };

  const controls = (
    <div
      className={`flex ${isLarge ? "gap-1" : ""} items-center justify-center`}
    >
      <QuantityButton
        onClick={() => changeQuantity(-1)}
        isIncrement={false}
        isLarge={isLarge}
      />
      <Text
        size={isLarge ? "lg" : "base"}
        className={isLarge ? "m-4 my-5" : "w-8 text-center"}
      >
        {quantity}
      </Text>
      <QuantityButton
        onClick={() => changeQuantity(1)}
        isIncrement={true}
        isLarge={isLarge}
      />
    </div>
  );

  if (!showLabel) {
    return controls;
  }

  return (
    <div className="flex justify-between items-center">
      <Text as="label" variant="label">
        Quantity
      </Text>
      {controls}
    </div>
  );
}
