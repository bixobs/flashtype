const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Result = require("../models/Result");


router.get("/me", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("username");

    const results = await Result.find({ user: userId })
      .sort({ createdAt: -1 });

    const totalTests = results.length;

    const avgWpm =
      totalTests > 0
        ? Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / totalTests)
        : 0;

    const bestWpm =
      totalTests > 0 ? Math.max(...results.map((r) => r.wpm)) : 0;

    res.json({
      username: user?.username,
      totalTests,
      avgWpm,
      bestWpm,
      history: results,
    });
  } catch (error) {
    console.error("ME ERROR:", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

module.exports = router;
