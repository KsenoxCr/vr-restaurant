"use client";

import React from "react";
import { ChefHat } from "lucide-react";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";

export const KitchenButton = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => {
  return (
    <Button
      variant="secondary"
      rounded="full"
      aria-label="Kitchen Terminal"
      className="fixed top-4 right-4 z-50 p-3"
      asChild
    >
      <Link href="/kitchen-view" ref={ref} {...props}>
        <ChefHat className="w-6 h-6" />
      </Link>
    </Button>
  );
});

KitchenButton.displayName = "KitchenButton";
