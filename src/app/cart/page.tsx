"use client";

import { useCartStore } from "~/stores/cart-store";
import { CartButton } from "../_components/cart-button";
import { BackButton } from "../_components/menu-items/back-button";
import { QuantityPicker } from "../_components/quantity-picker";
import { RemoveButton } from "./_components/remove-button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { ErrorScreen } from "../_components/error-screen";
import { formatCents } from "~/utils/price";

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
          <div className="w-[40%]">
            <p className="text-center">Your cart is empty.</p>
            <button
              className="py-3 mt-5 w-full text-white bg-green-600 rounded-lg transition-all active:bg-green-700 active:scale-105 group disabled:bg-neutral-400"
              onClick={
                window.history.length === 1
                  ? () => router.back()
                  : () => router.push("/menu-view")
              }
            >
              <span className="group-active:scale-105 group-active:text-neutral-400">
                Browse Menu
              </span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 p-6 w-full max-w-md">
            <div className="text-lg">
              <span className="text-neutral-400">Delivering to: </span>
              <span className="text-green-500">Seat {seatNumber}</span>
            </div>

            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.menuItemId}
                  className="flex flex-col gap-3 p-4 rounded-lg bg-neutral-800"
                >
                  <div className="flex gap-3 items-center">
                    <div className="overflow-hidden relative flex-shrink-0 w-16 h-16 rounded-lg bg-neutral-700">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex justify-center items-center w-full h-full text-neutral-500">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1">
                      <h3 className="text-base text-white">{item.name}</h3>
                      <p className="text-sm text-green-500">
                        {formatCents(item.priceCents)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <QuantityPicker
                        quantity={item.quantity}
                        setQuantity={(newQuantity) =>
                          updateQuantity(item.menuItemId, newQuantity)
                        }
                        max={10}
                        isLarge={false}
                        showLabel={false}
                      />
                      <RemoveButton
                        onClick={() => removeItem(item.menuItemId)}
                      />
                    </div>

                    <div className="text-base font-medium text-white">
                      {formatCents(item.priceCents * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 text-xl border-t border-neutral-700">
              <span className="text-neutral-400">Total</span>
              <span className="font-semibold text-green-500">
                {formatCents(getTotalPrice())}
              </span>
            </div>

            <button className="py-4 w-full text-lg font-medium text-white bg-green-600 rounded-lg transition-all hover:bg-green-700 active:scale-105">
              Place Order
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
