"use client";

type QuantityButtonProps = {
  onClick: () => void;
  isIncrement: boolean;
  isLarge?: boolean;
  disabled?: boolean;
};

export function QuantityButton({
  onClick,
  isIncrement,
  isLarge = false,
  disabled = false,
}: QuantityButtonProps) {
  const sizeClasses = isLarge ? "w-10 h-10 text-3xl" : "w-8 h-8 text-xl";
  const bgClasses = isIncrement
    ? "bg-green-600 active:bg-green-700"
    : "bg-neutral-900 active:bg-neutral-950";

  return (
    <button
      className={`flex items-center justify-center ${sizeClasses} ${bgClasses} group rounded-full transition-all active:scale-105 active:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="transition-transform group-active:scale-105">
        {isIncrement ? "+" : "-"}
      </span>
    </button>
  );
}
