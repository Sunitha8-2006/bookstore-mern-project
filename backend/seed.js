const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Book = require("./models/Book");
const User = require("./models/User");

dotenv.config();
connectDB();

const books = [
  {
    title: "The Silent Forest",
    author: "Elena Marsh",
    description: "A haunting tale of a village swallowed by an ancient woodland and the secrets it keeps.",
    price: 349,
    category: "Fiction",
    language: "English",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    stock: 25,
    rating: 4.6,
  },
  {
    title: "Dragon's Requiem",
    author: "Kito Anwar",
    description: "An epic fantasy of dragons, betrayal, and a kingdom on the edge of ruin.",
    price: 499,
    category: "Fantasy",
    language: "English",
    image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=500",
    stock: 18,
    rating: 4.8,
  },
  {
    title: "Letters to Nobody",
    author: "Priya Chandran",
    description: "A quiet, moving romance told through a decade of unsent letters.",
    price: 299,
    category: "Romance",
    language: "English",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    stock: 30,
    rating: 4.4,
  },
  {
    title: "The Vanishing Hour",
    author: "Marcus Webb",
    description: "A detective races against time to solve a disappearance that defies logic.",
    price: 399,
    category: "Mystery",
    language: "English",
    image: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?w=500",
    stock: 20,
    rating: 4.5,
  },
  {
    title: "Orbit of Ashes",
    author: "Renee Kato",
    description: "Humanity's last colony ship drifts toward a star that shouldn't exist.",
    price: 449,
    category: "Sci-Fi",
    language: "English",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
    stock: 15,
    rating: 4.7,
  },
  {
    title: "Atlas of a Quiet Mind",
    author: "Dr. Sarah Kline",
    description: "A practical, compassionate guide to building calm habits in a noisy world.",
    price: 279,
    category: "Self-Help",
    language: "English",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
    stock: 40,
    rating: 4.3,
  },
  {
    title: "The Cartographer's Daughter",
    author: "Isabel Novak",
    description: "A memoir-style biography of a woman who mapped continents no one believed existed.",
    price: 379,
    category: "Biography",
    language: "English",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
    stock: 22,
    rating: 4.5,
  },
  {
    title: "Moonlit Meadow Friends",
    author: "Tara Wills",
    description: "A gentle bedtime story collection about a meadow full of curious little creatures.",
    price: 199,
    category: "Children",
    language: "English",
    image: "https://images.unsplash.com/photo-1514894780887-121968d00567?w=500",
    stock: 50,
    rating: 4.9,
  },
];

const importData = async () => {
  try {
    await Book.deleteMany();
    await Book.insertMany(books);

    const adminExists = await User.findOne({ email: "admin@bookstore.com" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@bookstore.com",
        password: "admin123",
        role: "admin",
      });
    }

    console.log("✅ Sample books and admin user seeded successfully!");
    console.log("Admin login -> email: admin@bookstore.com | password: admin123");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
