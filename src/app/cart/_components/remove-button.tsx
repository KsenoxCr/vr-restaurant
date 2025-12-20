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
      active="intense"
      onClick={onClick}
    >
      <Trash2 size={16} />
    </Button>
  );
}
