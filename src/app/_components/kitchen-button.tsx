"use client";

import React from "react";
import { ChefHat } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export const KitchenButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const router = useRouter();

  return (
    <Button
      variant="secondary"
      rounded="full"
      aria-label="Kitchen Terminal"
      className="fixed top-4 right-4 z-50 p-3 shadow-lg active:shadow-xl"
      ref={ref}
      {...props}
      onClick={() => {
        router.push("/kitchen-view");
      }}
    >
      <ChefHat className="w-6 h-6" />
    </Button>
  );
});

KitchenButton.displayName = "KitchenButton";
