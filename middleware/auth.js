exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated() && req.user) {
    return next();
  }

  // Clear invalid session cookie
  res.clearCookie("connect.sid", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  });

  return res.status(401).json({
    success: false,
    message: "Unauthorized - Please log in first",
    documentation: "/api-docs"
  });
};
