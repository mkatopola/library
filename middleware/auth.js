exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  // Check if it's an API request by content type or path pattern
  const isApiRequest = 
    req.path.startsWith('/books') || 
    req.path.startsWith('/members') ||
    req.get('Content-Type') === 'application/json' ||
    req.accepts('json');

  if (isApiRequest) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Please log in first",
      login: "/login"
    });
  }
  
  // For browser requests
  res.redirect('/login');
};