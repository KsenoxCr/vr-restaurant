"use client";

import { useCartStore } from "~/stores/cart-store";
import { ErrorScreen } from "../_components/screen/error-screen";
import { EmptyCart } from "./_components/empty-cart";
import Cookies from "js-cookie";
import { CartButton } from "../_components/cart/cart-button";
import { BackButton } from "../menu-items/[id]/_components/back-button";
import { api } from "~/trpc/react";
import { TRPCError } from "@trpc/server";
import { useState, useRef } from "react";
import { CartItemView } from "./_components/cart-item-view";

type Messages = {
  message?: string;
  errorMessage?: string;
};

export default function CartPage() {
  const createOrder = api.order.create.useMutation();
  const [isError, setIsError] = useState(false);
  const messages = useRef<Messages>();

  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

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

  const placeOrder = () => {
    const menuItems = cartItems.map((mi) => {
      return { id: mi.menuItemId, quantity: mi.quantity };
    });

    try {
      createOrder.mutate({ items: menuItems });
    } catch (error) {
      messages.current = {
        message:
          error instanceof TRPCError && error.code === "BAD_REQUEST"
            ? "Order rejected"
            : "something went wrong...",
        errorMessage: error instanceof Error ? error.message : undefined,
      };

      return setIsError(true);
    }

    clearCart();

    // TODO: Order viewing logic (how do order state updates reflect client side)
  };

  // useState = orderStatus
  // orderInProgress = orderStatus

  // No cart items and noOrderInProgress: EmptyCart
  // CartItems and no orderInProgress: CartView
  // no cart items and orderInProgress OrderView
  // Add in MenuItem view -> cant add to cart if orderInProgress

  return (
    <>
      {isError && (
        <ErrorScreen
          message={messages.current?.message}
          errorMessage={messages.current?.errorMessage}
          callback={() => setIsError(false)}
          label="Back to Cart"
        />
      )}
      {}
      <main className="flex flex-col min-h-screen bg-dark">
        <header className="flex sticky inset-0 z-10 justify-between items-center w-screen bg-dark-gray">
          <BackButton />
          <CartButton />
        </header>
        <div className="flex flex-col flex-1 gap-3 justify-center items-center">
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <CartItemView
              cartItems={cartItems}
              seatNumber={seatNumber}
              placeOrder={placeOrder}
            />
          )}
        </div>
      </main>
    </>
  );
}
