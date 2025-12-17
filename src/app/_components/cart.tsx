import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export function CartButton() {
  return (
    <Link href="/cart" className="m-4 text-green-600">
      <ShoppingCart className="w-8 h-8" />
    </Link>
  );
}
