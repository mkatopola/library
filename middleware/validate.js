const { body, validationResult } = require("express-validator");

// middleware/validate.js
exports.validateBook = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("author").trim().notEmpty().withMessage("Author is required"),

  body("ISBN").trim().isISBN(13).withMessage("Invalid ISBN-13 format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateMember = [
  body("firstname").notEmpty(),
  body("lastname").notEmpty(),
  body("email").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
