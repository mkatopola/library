const express = require("express");
const router = express.Router();
const Member = require("../models/member");
const { validateMember } = require("../middleware/validate");
const { ensureAuth } = require("../middleware/auth");

// CREATE Member with duplicate checking
router.post("/", validateMember, async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check for existing member
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
        conflictField: "email"
      });
    }

    const member = await Member.create(req.body);
    res.status(201).json({
      success: true,
      data: member
    });
  } catch (err) {
    next(err);
  }
});

// READ ALL
router.get("/", async (req, res, next) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    next(err);
  }
});

// READ ONE
router.get("/:id", async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    next(err);
  }
});

// UPDATE Member
router.put("/:id", ensureAuth, validateMember, async (req, res, next) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    next(err);
  }
});

// DELETE Member
router.delete("/:id", ensureAuth, async (req, res, next) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
