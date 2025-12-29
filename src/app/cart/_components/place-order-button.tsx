"use client";

import { TRPCError } from "@trpc/server";
import { useRef, useState } from "react";
import { ErrorScreen } from "~/app/_components/screen/error-screen";
import { Button } from "~/app/_components/ui/button";
import { useCartStore } from "~/stores/cart-store";
import { api } from "~/trpc/react";

type PlaceOrderButtonProps = {
  disabled?: boolean;
};

export function PlaceOrderButton({ disabled = false }: PlaceOrderButtonProps) {
  const [isError, setIsError] = useState(false);
  const messages = useRef<{
    message?: string;
    errorMessage?: string;
  }>();
  const cartItems = useCartStore((state) => state.items);
  const createOrder = api.order.create.useMutation();

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

      setIsError(true);
    }
  };

  const placeOrderButton = (
    <Button
      size="lg"
      onClick={placeOrder}
      disabled={disabled}
      className="w-full font-medium"
    >
      Place Order
    </Button>
  );

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
      {placeOrderButton}
    </>
  );
}
