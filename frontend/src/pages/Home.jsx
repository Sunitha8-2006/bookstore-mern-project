import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import BookCard from "../components/BookCard";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get("/books?sort=rating&limit=4");
        setFeatured(data.books);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    { name: "Fiction", emoji: "📗" },
    { name: "Fantasy", emoji: "🐉" },
    { name: "Romance", emoji: "💌" },
    { name: "Mystery", emoji: "🔍" },
    { name: "Sci-Fi", emoji: "🚀" },
    { name: "Self-Help", emoji: "🌱" },
    { name: "Biography", emoji: "🖋️" },
    { name: "Children", emoji: "🧸" },
  ];

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Welcome to your next chapter</p>
          <h1 className="hero-title">
            Every Book Is a <span className="highlight">Door</span> Waiting to Open
          </h1>
          <p className="hero-subtitle">
            Explore thousands of titles across every genre, get personalized picks, and have
            your favorites delivered to your door — or your device.
          </p>
          <div className="hero-actions">
            <Link to="/books" className="btn-primary">Browse Books</Link>
            <Link to="/register" className="btn-outline">Create Account</Link>
          </div>
        </div>
        <div className="hero-graphic" aria-hidden="true">
          <div className="floating-book book-1">📕</div>
          <div className="floating-book book-2">📘</div>
          <div className="floating-book book-3">📙</div>
          <div className="floating-book book-4">📗</div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link to={`/books?category=${cat.name}`} key={cat.name} className="category-pill">
              <span className="category-emoji">{cat.emoji}</span>
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header-row">
          <h2 className="section-title">Top Rated Picks</h2>
          <Link to="/books" className="link-arrow">View all →</Link>
        </div>
        {loading ? (
          <p className="muted">Loading books...</p>
        ) : (
          <div className="book-grid">
            {featured.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>

      <section className="banner">
        <h2>Can't find what you're looking for?</h2>
        <p>Search our full catalog by title, author, or genre.</p>
        <Link to="/books" className="btn-primary">Explore the Full Catalog</Link>
      </section>
    </div>
  );
};

export default Home;
