"use client";

import { Button } from "~/app/_components/ui/button";
import { Typography } from "~/app/_components/ui/typography";
import Link from "next/link";

export function EmptyCartView() {
  return (
    <div className="flex flex-col flex-1 gap-3 justify-center items-center">
      <Typography as="p" variant="body" className="text-center">
        Your cart is empty.
      </Typography>
      <Button className="mt-5">
        <Link href="/menu">Browse Menu</Link>
      </Button>
    </div>
  );
}
