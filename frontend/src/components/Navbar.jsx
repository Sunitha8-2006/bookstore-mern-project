import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">📖</span>
          <span className="brand-text">BookStore</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/books">Browse</Link>
          {user && <Link to="/my-orders">My Orders</Link>}
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="cart-link">
            🛒 Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          {user ? (
            <div className="user-menu">
              <span className="user-name">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={handleLogout} className="btn-ghost">Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn-ghost">Login</Link>
              <Link to="/register" className="btn-primary-sm">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
