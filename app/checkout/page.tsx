"use client";

import { useCartStore } from "../../store/cartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { total, clearCart } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate a brief network delay for realism
    setTimeout(() => {
      const orderId = Math.floor(Math.random() * 1000000);
      clearCart();
      router.push(`/confirmation?orderId=ORD-${orderId}`);
    }, 800);
  };

  if (total === 0 && !isProcessing) {
    return <p style={{ padding: "20px" }}>No items to checkout.</p>;
  }

  return (
    <main style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Complete Your Order</h2>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Amount Due: \${total.toFixed(2)}</p>
      
      <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        <input type="text" placeholder="Full Name" required style={{ padding: "10px" }} />
        <input type="email" placeholder="Email Address" required style={{ padding: "10px" }} />
        <input type="text" placeholder="Credit Card Number" required pattern="\d{16}" title="16 digit card number" style={{ padding: "10px" }} />
        
        <button 
          type="submit" 
          disabled={isProcessing}
          style={{ background: isProcessing ? "gray" : "blue", color: "white", padding: "12px", border: "none", cursor: "pointer", borderRadius: "5px" }}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </main>
  );
}