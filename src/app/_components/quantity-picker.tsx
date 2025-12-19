"use client";

import { QuantityButton } from "./quantity-button";

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
      <span className={isLarge ? "m-4 my-6 text-lg" : "my-4 w-8 text-center"}>
        {quantity}
      </span>
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
    <div className="flex justify-between items-center my-2 mx-4">
      <label className="text-lg">Quantity</label>
      {controls}
    </div>
  );
}
