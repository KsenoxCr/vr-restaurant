import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  menuItemId: number;
  name: string;
  priceCents: number;
  imageUrl: string | null;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (menuItemId: number) => void;
  updateQuantity: (menuItemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [] as CartItem[],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.menuItemId === item.menuItemId,
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.menuItemId === item.menuItemId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: (menuItemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.menuItemId !== menuItemId),
        })),

      updateQuantity: (menuItemId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.menuItemId !== menuItemId),
            };
          }

          return {
            items: state.items.map((i) =>
              i.menuItemId === menuItemId ? { ...i, quantity } : i,
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.priceCents * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
