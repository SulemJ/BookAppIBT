import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Checkout</h1>
      <p className="mb-4">
        Your cart is ready. Checkout functionality will be added soon.
      </p>
      <Link href="/cart" className="text-blue-600 underline">
        Return to Cart
      </Link>
    </main>
  );
}
