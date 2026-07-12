import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  return (
    <div className="book-card">
      <Link to={`/books/${book._id}`} className="book-card-image-wrap">
        <img
          src={book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"}
          alt={book.title}
          className="book-card-image"
        />
        <span className="book-card-category">{book.category}</span>
      </Link>
      <div className="book-card-body">
        <Link to={`/books/${book._id}`}>
          <h3 className="book-card-title">{book.title}</h3>
        </Link>
        <p className="book-card-author">by {book.author}</p>
        <div className="book-card-meta">
          <span className="book-card-rating">★ {book.rating}</span>
          <span className="book-card-price">₹{book.price}</span>
        </div>
        <button className="btn-primary-sm full-width" onClick={() => addToCart(book)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
