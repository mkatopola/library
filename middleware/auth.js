// middleware/auth.js
exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    success: false,
    message: "Unauthorized - Please log in first",
    documentation: "/api-docs"
  });
};
