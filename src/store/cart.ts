'use client';

import { create } from 'zustand';

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  add: (item: CartItem): void =>
    set((state: CartState) => {
      const existing = state.items.find((product: CartItem) => product.id === item.id);

      if (existing) {
        return {
          items: state.items.map((product: CartItem) =>
            product.id === item.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      }

      return {
        items: [...state.items, item],
      };
    }),

  remove: (id: string): void =>
    set((state: CartState) => ({
      items: state.items.filter((item: CartItem) => item.id !== id),
    })),

  clear: (): void => set({ items: [] }),

  count: (): number =>
    get().items.reduce((total: number, item: CartItem) => total + item.quantity, 0),

  total: (): number =>
    get().items.reduce(
      (total: number, item: CartItem) => total + item.price * item.quantity,
      0
    ),
}));
