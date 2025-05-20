const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    ISBN: { type: String, unique: true },
    genre: { type: String },
    publicationYear: { type: Number },
    pageCount: { type: Number },
    availability: { type: Boolean, default: true }
  },
  { versionKey: false, timestamps: false }
);

module.exports = model("Book", bookSchema);
