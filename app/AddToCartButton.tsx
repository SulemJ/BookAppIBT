"use client";

import { useCartStore } from "../store/cartStore";

export default function AddToCartButton({ book }: { book: any }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button 
      onClick={() => addItem(book)}
      style={{ background: "blue", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}
    >
      Add to Cart
    </button>
  );
}