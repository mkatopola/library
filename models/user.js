const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = model('User', userSchema);
