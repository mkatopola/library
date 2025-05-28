const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  githubId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true },
  displayName: String,
  avatarUrl: String,
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = model("User", userSchema);