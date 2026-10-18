
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";


type GutendexBook = {
  id: number;
  title: string;
  authors?: { name: string }[];
  formats?: Record<string, string>;
};

export default async function Home() {
  let books: GutendexBook[] = [];

  try {
    const res = await fetch("https://gutendex.com/books/?page=1", {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      books = data.results ?? [];
    }
  } catch (error) {
    console.error("Unable to load books:", error);
  }

  return (
    <main className="booknest">
      <header className="bn-header">
        <Link href="/" className="bn-logo">
          <span className="bn-logo-icon">B</span>
          BookNest
        </Link>

        <nav className="bn-nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <a href="#books">Browse Books</a>
          <Link href="/cart">My Cart</Link>
        </nav>
      </header>

      <section className="bn-hero">
        <div className="bn-hero-content">
          <span className="bn-eyebrow">
            YOUR NEXT CHAPTER STARTS HERE
          </span>
          <h1>Find your next favorite book.</h1>
          <p>
            Explore timeless classics, discover inspiring stories,
            and find something wonderful to read at BookNest.
          </p>
          <a className="bn-primary-button" href="#books">
            Explore Books <span aria-hidden="true">→</span>
          </a>
          <div className="bn-hero-note">
            <span>✦</span> A world of stories, all in one place
          </div>
        </div>

        <div className="bn-hero-art" aria-hidden="true">
          <div className="bn-sun" />
          <div className="bn-book bn-book-one">
            <span>THE ART OF</span>
            <strong>IMAGINATION</strong>
            <i>Every page, a new world</i>
          </div>
          <div className="bn-book bn-book-two">
            <span>STORIES</span>
            <strong>UNTOLD</strong>
          </div>
          <div className="bn-book bn-book-three">
            <span>READ</span>
            <strong>MORE.</strong>
          </div>
          <div className="bn-sparkle bn-sparkle-one">✳</div>
          <div className="bn-sparkle bn-sparkle-two">✦</div>
        </div>
      </section>

      <section className="bn-categories" aria-label="Book categories">
        <div>
          <span className="bn-category-icon">📚</span>
          <span>
            <strong>Classic Literature</strong>
            <small>Timeless stories</small>
          </span>
        </div>
        <div>
          <span className="bn-category-icon">💡</span>
          <span>
            <strong>Knowledge</strong>
            <small>Ideas that inspire</small>
          </span>
        </div>
        <div>
          <span className="bn-category-icon">🌍</span>
          <span>
            <strong>Explore Worlds</strong>
            <small>Adventure awaits</small>
          </span>
        </div>
      </section>

      <section className="bn-books-section" id="books">
        <div className="bn-section-heading">
          <div>
            <span className="bn-eyebrow">THE BOOKSHELF</span>
            <h2>Discover your next read</h2>
            <p>
              Handpicked classics and fascinating reads to explore.
            </p>
          </div>
          <span className="bn-book-count">
            {books.length} books to explore
          </span>
        </div>

        {books.length > 0 ? (
          <div className="bn-book-grid">
            {books.map((book, index) => {
              const authorName =
                book.authors?.[0]?.name || "Unknown Author";
              const mockPrice = 15.99;
              const cover = book.formats?.["image/jpeg"];

              return (
                <article className="bn-book-card" key={book.id}>
                  <div className={`bn-cover bn-cover-${index % 6}`}>
                    {cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cover}
                        alt={`Cover of ${book.title}`}
                      />
                    ) : (
                      <div className="bn-cover-placeholder">
                        <span>BOOKNEST</span>
                        <strong>{book.title}</strong>
                        <small>{authorName}</small>
                      </div>
                    )}
                    <span className="bn-cover-label">CLASSIC</span>
                  </div>

                  <div className="bn-book-info">
                    <h3>{book.title}</h3>
                    <p className="bn-author">by {authorName}</p>
                    <div className="bn-book-bottom">
                      <strong className="bn-price">
                        ${mockPrice.toFixed(2)}
                      </strong>
                      <AddToCartButton
                        book={{
                          id: book.id,
                          title: book.title,
                          author: authorName,
                          price: mockPrice,
                        }}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bn-empty">
            <span>📖</span>
            <h3>Your bookshelf is taking a little break</h3>
            <p>Please refresh the page in a moment to load the books.</p>
          </div>
        )}
      </section>

      <section className="bn-bottom-banner">
        <div>
          <span className="bn-eyebrow">
            MAKE TIME FOR A GOOD STORY
          </span>
          <h2>Every great journey begins with a page.</h2>
        </div>
        <a href="#books" className="bn-primary-button">
          Find Your Book →
        </a>
      </section>

      <footer className="bn-footer">
        <Link href="/" className="bn-logo">
          <span className="bn-logo-icon">B</span>
          BookNest
        </Link>
        <p>A little corner of the world for people who love books.</p>
        <span>© {new Date().getFullYear()} BookNest</span>
      </footer>
    </main>
  );
}
