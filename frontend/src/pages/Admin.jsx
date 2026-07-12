import React, { useEffect, useState } from "react";
import api from "../api/api";

const emptyForm = {
  title: "", author: "", description: "", price: "", category: "Fiction",
  language: "English", image: "", stock: 10, rating: 4.5,
};

const categories = [
  "Fiction", "Non-Fiction", "Fantasy", "Romance",
  "Mystery", "Sci-Fi", "Biography", "Self-Help", "Children", "Poetry",
];

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/books?limit=100");
      setBooks(data.books);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock), rating: Number(form.rating) };
      if (editingId) {
        await api.put(`/books/${editingId}`, payload);
        setMessage("Book updated successfully.");
      } else {
        await api.post("/books", payload);
        setMessage("Book added successfully.");
      }
      resetForm();
      fetchBooks();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (book) => {
    setForm({ ...book });
    setEditingId(book._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="section">
      <h1 className="page-title">Admin Dashboard</h1>
      {message && <div className="info-box">{message}</div>}

      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Book" : "Add New Book"}</h2>
        <div className="admin-form-grid">
          <div>
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label>Author</label>
            <input name="author" value={form.author} onChange={handleChange} required />
          </div>
          <div>
            <label>Price (₹)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} required min="0" />
          </div>
          <div>
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label>Stock</label>
            <input type="number" name="stock" value={form.stock} onChange={handleChange} min="0" />
          </div>
          <div>
            <label>Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          </div>
        </div>
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows="3" required />
        <div className="admin-form-actions">
          <button type="submit" className="btn-primary">{editingId ? "Update Book" : "Add Book"}</button>
          {editingId && <button type="button" className="btn-ghost" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <h2 className="section-title">All Books ({books.length})</h2>
      {loading ? (
        <p className="muted">Loading...</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th><th>Author</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>₹{book.price}</td>
                  <td>{book.stock}</td>
                  <td className="admin-actions">
                    <button className="btn-ghost" onClick={() => handleEdit(book)}>Edit</button>
                    <button className="btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
