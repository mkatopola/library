const express = require('express');
const router = express.Router();
const passport = require('passport');

// Proper login endpoint
router.get('/login', (req, res) => {
  res.json({ 
    message: 'Use /auth/github to authenticate with GitHub',
    authEndpoint: '/auth/github' 
  });
});

// Initiate GitHub auth
router.get('/github', passport.authenticate('github'));

// GitHub callback handler
router.get('/github/callback',
  passport.authenticate('github', { 
    failureRedirect: '/api-docs',
    failureMessage: true 
  }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

// Logout handler
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;