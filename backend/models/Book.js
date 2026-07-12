const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: [
        "Fiction",
        "Non-Fiction",
        "Fantasy",
        "Romance",
        "Mystery",
        "Sci-Fi",
        "Biography",
        "Self-Help",
        "Children",
        "Poetry",
      ],
    },
    language: { type: String, default: "English" },
    image: { type: String, default: "" },
    stock: { type: Number, default: 10, min: 0 },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
  },
  { timestamps: true }
);

bookSchema.index({ title: "text", author: "text", description: "text" });

module.exports = mongoose.model("Book", bookSchema);
