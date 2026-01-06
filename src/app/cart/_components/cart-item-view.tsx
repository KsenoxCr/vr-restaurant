import type { CartItem as CartItemType } from "~/stores/cart-store";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { SeatDisplay } from "./seat-display";
import { Button } from "~/app/_components/ui/button";

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
    <div className="flex flex-col flex-1 gap-6 p-6 w-full max-w-md">
      <SeatDisplay seatNumber={seatNumber} />
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <CartItem key={item.menuItemId} item={item} />
        ))}
        <CartSummary />
        <Button size="lg" onClick={placeOrder} className="w-full font-medium">
          Place Order
        </Button>
      </div>
    </div>
  );
}
