const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', passport.authenticate('github', {scope: ['user:email']}));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
    (res, req) => res.redirect('/api-docs')
);
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    req.session.destroy((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
});