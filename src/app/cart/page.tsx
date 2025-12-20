"use client";

import { useCartStore } from "~/stores/cart-store";
import { CartButton } from "../_components/cart-button";
import { BackButton } from "../_components/menu-items/back-button";
import { ErrorScreen } from "../_components/error-screen";
import { CartItem } from "./_components/cart-item";
import { EmptyCart } from "./_components/empty-cart";
import { CartHeader } from "./_components/cart-header";
import { CartSummary } from "./_components/cart-summary";
import { PlaceOrderButton } from "./_components/place-order-button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { navigateBack } from "~/lib/utils/navigation";

export default function CartPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const seatNumber = Cookies.get("seatNumber");

  if (seatNumber === undefined) {
    return (
      <ErrorScreen
        href="/seat-selection"
        message="Session not created..."
        label="Select Seat"
      />
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-neutral-900 text-neutral-300">
      <header className="flex justify-between items-center w-screen bg-neutral-800">
        <BackButton />
        <CartButton />
      </header>
      <div className="flex flex-1 justify-center items-center">
        {items.length === 0 ? (
          <EmptyCart onBrowseMenu={() => navigateBack(router, "/menu-view")} />
        ) : (
          <div className="flex flex-col gap-6 p-6 w-full max-w-md">
            <CartHeader seatNumber={seatNumber} />

            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <CartItem
                  key={item.menuItemId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <CartSummary totalPrice={getTotalPrice()} />

            <PlaceOrderButton />
          </div>
        )}
      </div>
    </main>
  );
}
