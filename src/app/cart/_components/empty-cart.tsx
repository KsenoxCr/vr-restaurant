"use client";

import { Button } from "~/app/_components/ui/button";
import { Text } from "~/app/_components/ui/text";
import Link from "next/link";

export function EmptyCart() {
  return (
    <>
      <Text as="p" variant="body" className="text-center">
        Your cart is empty.
      </Text>
      <Button className="mt-5">
        <Link href="/menu-view">Browse Menu</Link>
      </Button>
    </>
  );
}
