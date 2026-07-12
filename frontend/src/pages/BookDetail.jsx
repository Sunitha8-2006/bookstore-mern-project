import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { useCart } from "../context/CartContext";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/books/${id}`);
        setBook(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleAdd = () => {
    addToCart(book, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) return <div className="section"><p className="muted">Loading...</p></div>;
  if (!book) return <div className="section"><p className="muted">Book not found.</p></div>;

  return (
    <div className="section">
      <Link to="/books" className="link-arrow">← Back to Browse</Link>
      <div className="book-detail">
        <div className="book-detail-image-wrap">
          <img src={book.image} alt={book.title} className="book-detail-image" />
        </div>
        <div className="book-detail-info">
          <span className="book-card-category">{book.category}</span>
          <h1>{book.title}</h1>
          <p className="book-detail-author">by {book.author}</p>
          <div className="book-card-meta">
            <span className="book-card-rating">★ {book.rating} rating</span>
            <span className="muted">· {book.stock} in stock</span>
          </div>
          <p className="book-detail-description">{book.description}</p>
          <p className="book-detail-price">₹{book.price}</p>

          <div className="qty-row">
            <label>Quantity</label>
            <div className="qty-control">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          <button className="btn-primary" onClick={handleAdd}>
            {added ? "Added! ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
