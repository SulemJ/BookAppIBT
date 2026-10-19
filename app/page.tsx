import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export const instant = false; 

export default async function Home() {

  const res = await fetch("https://gutendex.com/books/?page=1");
  const data = await res.json();
  const limitedResults = data.results.slice(0, 14);

  return (
    <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>CodeOps Book Store</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {/* {data.results.map((book: any) => { */}
        {limitedResults.map((book: any) => {
          const authorName = book.authors?.[0]?.name || "Unknown Author";
          const mockPrice = 15.99; 
          
          return (
            <div key={book.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>{book.title}</h3>
              <p style={{ color: "#666", marginBottom: "15px" }}>By {authorName}</p>
              <p style={{ fontWeight: "bold", marginBottom: "15px" }}>${mockPrice}</p>
              <AddToCartButton book={{ id: book.id, title: book.title, author: authorName, price: mockPrice }} />
            </div>
          );
        })}
      </div>
    </main>
  );
}