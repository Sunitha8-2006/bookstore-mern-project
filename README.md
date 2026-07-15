# 📚 BookStore — MERN Stack Project

A full-featured online bookstore built with **MongoDB, Express.js, React, and Node.js**.
Browse books, filter by category, add to cart, checkout, track orders, and manage
inventory through an admin dashboard.

---

## ✨ Features

- Browse & search books by title/author, filter by category, sort by price/rating
- Book detail pages with quantity selector
- Cart (persisted in browser) + checkout flow
- User authentication (JWT) — register/login
- Order history for logged-in users
- Admin dashboard — add / edit / delete books, view all books
- Fully responsive, custom-designed UI (not a generic template)

---

## 🗂️ Project Structure

```
bookstore/
├── backend/          Express + MongoDB API
│   ├── config/        DB connection
│   ├── controllers/    Route logic
│   ├── middleware/     Auth (JWT) middleware
│   ├── models/         Mongoose schemas (User, Book, Order)
│   ├── routes/          API routes
│   ├── seed.js          Sample data + admin user
│   └── server.js         App entry point
└── frontend/         React (Vite) client
    └── src/
        ├── api/          Axios instance
        ├── components/    Navbar, Footer, BookCard
        ├── context/        Auth + Cart state
        ├── pages/           Home, Books, Cart, Admin, etc.
        └── index.css         Custom bookstore theme
```

---


## 📸 Screenshots

### Home Page
![Home](screenshots/home.png)

### Admin Page
![Admin](screenshots/admin.png)

### Collections Page
![Collwctions](screenshots/collections.png)

###  Cart Page
![Cart](screenshots/cart.png)

### My Orders Page
![My Orders ](screenshots/myorders.png)
 
### Render Page
![My render](screenshots/render.png)

### vercel Page
![My vercel](screenshots/render.png)







## 🚀 Step-by-Step Setup

### 1. Install prerequisites
- [Node.js v16+](https://nodejs.org/) and npm
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community) (or use a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster instead of installing locally)
- A code editor (VS Code recommended)

### 2. Start MongoDB
If installed locally, start the MongoDB service (varies by OS), or just get a free
connection string from MongoDB Atlas.

### 3. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Open `.env` and set:
```
MONGO_URI=mongodb://127.0.0.1:27017/bookstore   # or your Atlas connection string
JWT_SECRET=any_long_random_string
PORT=5000
```
Seed the database with sample books + an admin account:
```bash
npm run seed
```
Start the API server:
```bash
npm run dev
```
The API will run at `http://localhost:5000`.

### 4. Frontend setup
Open a **new terminal**:
```bash
cd frontend
npm install
npm run dev
```
The app will run at `http://localhost:3000` and automatically proxies API calls to
the backend.

### 5. Log in
- **Admin account** (created by the seed script): `admin@bookstore.com` / `admin123`
- Or register a new regular user account from the Sign Up page.

---

## 🔑 Environment Variables (backend/.env)

| Variable      | Description                          |
|---------------|---------------------------------------|
| `MONGO_URI`   | MongoDB connection string             |
| `JWT_SECRET`  | Secret key used to sign JWT tokens    |
| `PORT`        | Port the API server runs on           |

---

## 📡 API Endpoints

| Method | Endpoint             | Description                | Auth        |
|--------|-----------------------|-----------------------------|-------------|
| POST   | /api/auth/register    | Register new user           | Public      |
| POST   | /api/auth/login       | Login                       | Public      |
| GET    | /api/auth/profile     | Get logged-in user profile  | User        |
| GET    | /api/books            | List books (search/filter)  | Public      |
| GET    | /api/books/:id        | Get single book              | Public      |
| POST   | /api/books            | Create book                  | Admin       |
| PUT    | /api/books/:id        | Update book                  | Admin       |
| DELETE | /api/books/:id        | Delete book                  | Admin       |
| POST   | /api/orders           | Place an order                | User        |
| GET    | /api/orders/my        | Get my orders                 | User        |
| GET    | /api/orders           | Get all orders                | Admin       |

---

## 🌐 Deploying (for your Demo link)

- **Backend**: Deploy free on [Render](https://render.com) or [Railway](https://railway.app). Set the same env vars there, and use MongoDB Atlas for the database.
- **Frontend**: Deploy free on [Vercel](https://vercel.com) or [Netlify](https://netlify.com). Set an environment variable / update `vite.config.js` proxy or `api.js` baseURL to point to your deployed backend URL.
- **GitHub**: Push this whole `bookstore/` folder as your repository, then share the GitHub link and the deployed demo link with your team lead so your mentor can review it.

---

## 🛠️ Built With
HTML · CSS · JavaScript · React.js · Node.js · Express.js · MongoDB
