"use client";

import { QuantityButton } from "./quantity-button";
import { Typography } from "~/app/_components/ui/typography";

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
      <Typography
        size={isLarge ? "lg" : "base"}
        className={isLarge ? "m-4 my-5" : "w-8 text-center"}
      >
        {quantity}
      </Typography>
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
      <Typography as="label">Quantity</Typography>
      {controls}
    </div>
  );
}
