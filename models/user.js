// models/user.js
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    githubId: { type: String, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model("User", userSchema);
