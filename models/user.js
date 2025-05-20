const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  },
  { versionKey: false, timestamps: false }
);

module.exports = model("User", userSchema);
