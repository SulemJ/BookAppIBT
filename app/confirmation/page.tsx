import Link from "next/link";

export const instant = false; // Add this line to fix the error

export default async function ConfirmationPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ orderId?: string }> 
}) {
  const { orderId } = await searchParams;

  return (
    <main style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "10px" }}>☑️</div>
      <h1 style={{ color: "green" }}>Order Confirmed!</h1>
      <p style={{ fontSize: "1.2rem", color: "#333", marginTop: "15px" }}>
        Thank you for your purchase. 
      </p>
      {orderId && (
        <div style={{ background: "#eee", padding: "15px", borderRadius: "5px", margin: "20px 0" }}>
          <strong>Order ID:</strong> {orderId}
        </div>
      )}
      <p style={{ color: "#666", marginBottom: "30px" }}>
        A confirmation receipt has been sent to your email.
      </p>
      
      <Link 
        href="/" 
        style={{ background: "blue", color: "white", padding: "12px 24px", textDecoration: "none", borderRadius: "5px" }}
      >
        Return to Store
      </Link>
    </main>
  );
}