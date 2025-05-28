const { Schema, model } = require("mongoose");

const memberSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    membershipDate: { type: Date, default: Date.now }
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("Member", memberSchema);
