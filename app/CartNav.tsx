"use client";

import Link from "next/link";
import { useCartStore } from "../store/cartStore";

export default function CartNav() {
  const items = useCartStore((state) => state.items);
  
  return (
    <nav style={{ display: "flex", gap: "20px" }}>
      <Link href="/" style={{ textDecoration: "none", color: "#333" }}>Store</Link>
      <Link href="/cart" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>
        Cart ({items.length})
      </Link>
    </nav>
  );
}