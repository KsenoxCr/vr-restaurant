import type { CartItem as CartItemType } from "~/stores/cart-store";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { PlaceOrderButton } from "./place-order-button";
import { SeatDisplay } from "./seat-display";

type CartItemViewProps = {
  cartItems: CartItemType[];
  seatNumber: string;
  placeOrder: () => void;
};

export function CartItemView({
  cartItems,
  seatNumber,
  placeOrder,
}: CartItemViewProps) {
  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-md">
      <SeatDisplay seatNumber={seatNumber} />
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <CartItem key={item.menuItemId} item={item} />
        ))}
        <CartSummary />
        <PlaceOrderButton onClick={placeOrder} />
      </div>
    </div>
  );
}
