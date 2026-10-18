"use client";

import { useCartStore } from "../../store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const {
    items,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>

      {items.length === 0 ? (
        <div>
          <p className="mb-4">Your cart is empty.</p>
          <Link href="/" className="text-blue-600 underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.book.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4"
              >
                <div>
                  <h2 className="font-semibold">{item.book.title}</h2>
                  <p className="text-sm text-gray-600">
                    {item.book.author}
                  </p>
                  <p>
                    {item.book.price.toFixed(2)} × {item.quantity}
                    {" = "}
                    {(item.book.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.book.id)}
                    className="rounded border px-3 py-1"
                    aria-label={`Decrease quantity of ${item.book.title}`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.book.id)}
                    className="rounded border px-3 py-1"
                    aria-label={`Increase quantity of ${item.book.title}`}
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item.book.id)}
                    className="rounded bg-red-600 px-3 py-1 text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="mb-4 text-xl font-bold">
              Total: {total.toFixed(2)}
            </p>

            <button
              onClick={clearCart}
              className="mr-3 rounded border px-4 py-2"
            >
              Clear Cart
            </button>

            <Link
              href="/checkout"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
