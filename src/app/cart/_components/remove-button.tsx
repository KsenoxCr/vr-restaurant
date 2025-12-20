"use client";

import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";

type RemoveButtonProps = {
  onClick: () => void;
};

export function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <Button
      variant="destructive"
      size="icon"
      rounded="full"
      onClick={onClick}
    >
      <span className="transition-transform group-active:scale-105">
        <Trash2 size={16} />
      </span>
    </Button>
  );
}
