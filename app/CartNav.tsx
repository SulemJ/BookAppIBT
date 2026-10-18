"use client";

import Link from "next/link";
import { useCartStore } from "../store/cartStore";

export default function CartNav() {
  const count = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="flex gap-5">
      <Link href="/">Store</Link>
      <Link href="/cart" className="font-bold text-blue-600">
        Cart ({count})
      </Link>
    </nav>
  );
}