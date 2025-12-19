"use client";

type PlaceOrderButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export function PlaceOrderButton({
  onClick,
  disabled = false,
}: PlaceOrderButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="py-4 w-full text-lg font-medium text-white bg-green-600 rounded-lg transition-all hover:bg-green-700 active:scale-105 disabled:bg-neutral-400 disabled:cursor-not-allowed"
    >
      Place Order
    </button>
  );
}
