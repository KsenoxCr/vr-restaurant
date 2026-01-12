"use client";

import { useCartStore } from "~/stores/cart-store";
import { ErrorScreen } from "../_components/screen/error-screen";
import { EmptyCartView } from "./_components/empty-cart-view";
import Cookies from "js-cookie";
import { CartButton } from "../_components/cart/cart-button";
import { BackButton } from "../_components/behavior/back-button";
import { api } from "~/trpc/react";
import { TRPCError } from "@trpc/server";
import { useState, useRef } from "react";
import { CartItemView } from "./_components/cart-item-view";
import { OrderStatusScreen } from "./order-status/order-status-screen";
import { useOrderStore } from "~/stores/order-store";
import { LoadingScreen } from "../_components/screen/loading-screen";

type Messages = {
  message?: string;
  errorMessage?: string;
};

export default function CartPage() {
  const [isError, setIsError] = useState(false);
  const messages = useRef<Messages>();

  const sessionQuery = api.session.getCurrent.useQuery();

  // TODO: Add ordering constraint for max orders kitchen can handle
  const orderMutation = api.order.create.useMutation();

  if (sessionQuery.isLoading) {
    return <LoadingScreen color="gray" />;
  }

  if (sessionQuery.isError) {
    return (
      <ErrorScreen
        title="Seat not selected"
        href="/seat-selection"
        label="Select Seat"
      />
    );
  }

  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const orderId = useOrderStore((state) => state.id);
  const setOrderDetails = useOrderStore((state) => state.setOrderDetails);

  if (isError) {
    return (
      <ErrorScreen
        title={messages.current?.message}
        message={messages.current?.errorMessage}
        callback={() => setIsError(false)}
        label="Back to Cart"
      />
    );
  }

  const placeOrder = () => {
    const menuItems = cartItems.map((mi) => {
      return { id: mi.menuItemId, quantity: mi.quantity };
    });

    orderMutation.mutate(
      { items: menuItems },
      {
        onError: (error) => {
          messages.current = {
            message:
              error instanceof TRPCError && error.code === "BAD_REQUEST"
                ? "Order rejected"
                : "something went wrong...",
            errorMessage: error instanceof Error ? error.message : undefined,
          };

          setIsError(true);
        },
        onSuccess(data) {
          clearCart();

          setOrderDetails(
            data.id,
            data.items.map((item) => ({
              name: item.menuItem.name,
              priceCents: item.priceSnapshotCents,
              quantity: item.quantity,
            })),
          );
        },
      },
    );
  };

  const showAppropriateView = () => {
    if (cartItems.length === 0) {
      return <EmptyCartView />;
    }

    return (
      <CartItemView
        cartItems={cartItems}
        seatNumber={sessionQuery.data!.seatNumber.toString()}
        placeOrder={placeOrder}
      />
    );
  };

  if (orderId) {
    return <OrderStatusScreen />;
  }

  return (
    <>
      <main className="flex flex-col min-h-screen bg-dark">
        <header className="flex sticky inset-0 z-10 justify-between items-center w-screen bg-dark-gray">
          <BackButton fallbackHref="/menu" />
          <CartButton />
        </header>
        {showAppropriateView()}
      </main>
    </>
  );
}
