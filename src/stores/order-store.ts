import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export type OrderItem = {
  name: string;
  priceCents: number;
  quantity: number;
};

type OrderStore = {
  id: number;
  items: OrderItem[];
  setOrderDetails: (id: number, items: OrderItem[]) => void;
  getTotalPrice: () => number;
  clearState: () => void;
};

export const useOrderStore = create<OrderStore>()(
  devtools(
    persist(
      (set, get) => ({
        id: -0,
        items: [],

        setOrderDetails: (id, items) => set(() => ({ id: id, items: items })),

        getTotalPrice: () =>
          get().items.reduce(
            (sum, item) => sum + item.priceCents * item.quantity,
            0,
          ),

        clearState: () => set({ id: -0, items: [] }),
      }),
      {
        name: "order-store",
      },
    ),
    { name: "orderStore" },
  ),
);
