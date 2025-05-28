const express = require("express");
const router = express.Router();
const passport = require("passport");

// Authentication routes
router.get("/login", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/api-docs"
  })
);

router.get("/logout", async (req, res) => {
  try {
    const sessionId = req.sessionID;

    // Destroy session from store
    await new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Clear client cookie
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    });

    res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Logout failed - Please try again"
    });
  }
});

module.exports = router;
