import { create } from "zustand";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number; // Mock price since Gutendex is free
}

interface CartStore {
  items: Book[];
  total: number;
  addItem: (book: Book) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (book) => set((state) => ({
    items: [...state.items, book],
    total: state.total + book.price
  })),
  clearCart: () => set({ items: [], total: 0 })
}));