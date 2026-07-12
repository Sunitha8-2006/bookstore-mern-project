import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

const Cart = () => {
  const { cartItems, updateQty, removeFromCart, clearCart, totalAmount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setPlacing(true);
    try {
      const items = cartItems.map((item) => ({
        book: item._id,
        title: item.title,
        qty: item.qty,
        price: item.price,
      }));
      await api.post("/orders", { items, totalAmount });
      clearCart();
      setMessage("🎉 Order placed successfully!");
      setTimeout(() => navigate("/my-orders"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Checkout failed");
    } finally {
      setPlacing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="section empty-state">
        <h2>Your cart is empty 🛒</h2>
        <p className="muted">Looks like you haven't added any books yet.</p>
        <Link to="/books" className="btn-primary">Browse Books</Link>
      </div>
    );
  }

  return (
    <div className="section">
      <h1 className="page-title">Your Cart</h1>
      {message && <div className="info-box">{message}</div>}
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.title} />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p className="muted">by {item.author}</p>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              <div className="qty-control">
                <button onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item._id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
          <button className="btn-primary full-width" onClick={handleCheckout} disabled={placing}>
            {placing ? "Placing order..." : "Checkout"}
          </button>
          {!user && <p className="hint">You'll need to log in to complete checkout.</p>}
        </div>
      </div>
    </div>
  );
};

export default Cart;
