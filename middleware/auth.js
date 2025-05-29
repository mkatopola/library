exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  // For API routes, return JSON error
  if (req.path.startsWith('/api') || req.accepts('json')) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Please log in first",
      login: "/login"
    });
  }
  
  // For browser requests, redirect to login
  res.redirect('/login');
};