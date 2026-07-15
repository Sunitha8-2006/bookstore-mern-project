import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statuses = ["Pending", "Confirmed", "Shipped", "Delivered"];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my");
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="section">
        <p className="muted">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="section empty-state">
        <h2>No orders yet 📦</h2>
        <p className="muted">
          Once you place an order, it'll show up here.
        </p>

        <Link to="/books" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="section">
      <h1 className="page-title">My Orders</h1>

      <div className="orders-list">
        {orders.map((order) => {
          const currentStatusIndex = statuses.indexOf(order.status);

          return (
            <div className="order-card" key={order._id}>
              <div className="order-card-header">
                <div>
                  <p className="order-id">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>

                  <p className="muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`status-badge status-${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-progress">
                {statuses.map((status, index) => (
                  <div
                    key={status}
                    className={`progress-step ${
                      index <= currentStatusIndex ? "active" : ""
                    }`}
                  >
                    <div className="progress-circle">
                      {index < currentStatusIndex ? "✓" : index + 1}
                    </div>

                    <span>{status}</span>
                  </div>
                ))}
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div className="order-item-row" key={idx}>
                    <span>
                      {item.title} × {item.qty}
                    </span>

                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <span>Total</span>

                <span className="order-total">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;