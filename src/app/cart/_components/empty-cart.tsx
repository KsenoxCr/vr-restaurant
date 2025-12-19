"use client";

type EmptyCartProps = {
  onBrowseMenu: () => void;
};

export function EmptyCart({ onBrowseMenu }: EmptyCartProps) {
  return (
    <div className="w-[40%]">
      <p className="text-center">Your cart is empty.</p>
      <button
        className="py-3 mt-5 w-full text-white bg-green-600 rounded-lg transition-all active:bg-green-700 active:scale-105 group disabled:bg-neutral-400"
        onClick={onBrowseMenu}
      >
        <span className="group-active:scale-105 group-active:text-neutral-400">
          Browse Menu
        </span>
      </button>
    </div>
  );
}
