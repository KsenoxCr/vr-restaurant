"use client";

import { Trash2 } from "lucide-react";

type RemoveButtonProps = {
  onClick: () => void;
};

export function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center w-8 h-8 text-white rounded-full transition-all active:bg-red-700 active:scale-105 group bg-neutral-700 active:text-neutral-400"
    >
      <span className="transition-transform group-active:scale-105">
        <Trash2 size={16} />
      </span>
    </button>
  );
}
