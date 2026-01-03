"use client";

import { useCartStore } from "~/stores/cart-store";
import { ErrorScreen } from "../_components/screen/error-screen";
import { EmptyCartView } from "./_components/empty-cart-view";
import Cookies from "js-cookie";
import { CartButton } from "../_components/cart/cart-button";
import { BackButton } from "../menu-items/[id]/_components/back-button";
import { api } from "~/trpc/react";
import { TRPCError } from "@trpc/server";
import { useState, useRef } from "react";
import { CartItemView } from "./_components/cart-item-view";
import { LoadingScreen } from "../_components/screen/loading-page";
import { OrderStatusView } from "./order-status/order-status-view";

type Messages = {
  message?: string;
  errorMessage?: string;
};

export default function CartPage() {
  const [orderId, setOrderId] = useState<number>(NaN);
  const [isError, setIsError] = useState(false);
  const messages = useRef<Messages>();

  const orderMutation = api.order.create.useMutation();

  const orderQuery = api.order.getById.useQuery(orderId, {
    enabled: !!orderId,
    refetchInterval: 1000,
  });

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

          setOrderId(data.id);
        },
      },
    );
  };

  // useState = orderStatus
  // orderInProgress = orderStatus

  // No cart items and noOrderInProgress: EmptyCart
  // CartItems and no orderInProgress: CartView
  // no cart items and orderInProgress OrderView
  // Add in MenuItem view -> cant add to cart if orderInProgress

  if (isError) {
    return (
      <ErrorScreen
        message={messages.current?.message}
        errorMessage={messages.current?.errorMessage}
        callback={() => setIsError(false)}
        label="Back to Cart"
      />
    );
  }

  const showAppropriateView = () => {
    if (orderId && !orderQuery.data) {
      return <LoadingScreen color={"dark"} />;
    }

    if (orderId && orderQuery.data) {
      return <OrderStatusView status={orderQuery.data.status} />;
    }

    if (cartItems.length === 0) {
      return <EmptyCartView />;
    }

    return (
      <CartItemView
        cartItems={cartItems}
        seatNumber={seatNumber}
        placeOrder={placeOrder}
      />
    );
  };

  return (
    <>
      <main className="flex flex-col min-h-screen bg-dark">
        <header className="flex sticky inset-0 z-10 justify-between items-center w-screen bg-dark-gray">
          <BackButton />
          <CartButton />
        </header>
        {showAppropriateView()}
      </main>
    </>
  );
}
