
import { create } from "zustand";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (book: Book) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,

  addItem: (book) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.book.id === book.id
      );

      const items = existing
        ? state.items.map((item) =>
            item.book.id === book.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { book, quantity: 1 }];

      return {
        items,
        total: items.reduce(
          (sum, item) => sum + item.book.price * item.quantity,
          0
        ),
      };
    }),

  increaseQuantity: (id) =>
    set((state) => {
      const items = state.items.map((item) =>
        item.book.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        items,
        total: items.reduce(
          (sum, item) => sum + item.book.price * item.quantity,
          0
        ),
      };
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const items = state.items
        .map((item) =>
          item.book.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        items,
        total: items.reduce(
          (sum, item) => sum + item.book.price * item.quantity,
          0
        ),
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter(
        (item) => item.book.id !== id
      );

      return {
        items,
        total: items.reduce(
          (sum, item) => sum + item.book.price * item.quantity,
          0
        ),
      };
    }),

  clearCart: () => set({ items: [], total: 0 }),
}));
