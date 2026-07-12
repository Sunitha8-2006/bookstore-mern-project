import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import BookCard from "../components/BookCard";

const categories = [
  "All", "Fiction", "Non-Fiction", "Fantasy", "Romance",
  "Mystery", "Sci-Fi", "Biography", "Self-Help", "Children", "Poetry",
];

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (category !== "All") params.append("category", category);
        if (sort) params.append("sort", sort);
        params.append("limit", 24);

        const { data } = await api.get(`/books?${params.toString()}`);
        setBooks(data.books);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [search, category, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (search) params.search = search;
    if (category !== "All") params.category = category;
    if (sort) params.sort = sort;
    setSearchParams(params);
  };

  const setCategory = (cat) => {
    const params = {};
    if (search) params.search = search;
    if (cat !== "All") params.category = cat;
    if (sort) params.sort = sort;
    setSearchParams(params);
  };

  const setSort = (val) => {
    const params = {};
    if (search) params.search = search;
    if (category !== "All") params.category = category;
    if (val) params.sort = val;
    setSearchParams(params);
  };

  return (
    <div className="section">
      <h1 className="page-title">Browse Our Collection</h1>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn-primary-sm">Search</button>
      </form>

      <div className="filter-row">
        <div className="chip-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip ${category === cat ? "chip-active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort: Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {loading ? (
        <p className="muted">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="muted">No books found. Try a different search or category.</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
