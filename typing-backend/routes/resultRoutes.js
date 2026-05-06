const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Result = require("../models/Result");


router.post("/result", auth, async (req, res) => {
  try {
    const { wpm, accuracy } = req.body;

    const newResult = new Result({
      wpm,
      accuracy,
      user: req.user.id,
    });

    await newResult.save();
    res.json(newResult);
  } catch (error) {
    console.error("RESULT ERROR:", error);
    res.status(500).json({ message: "Error saving result" });
  }
});


router.get("/results", async (req, res) => {
  try {
    const results = await Result.find().populate("user", "username");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      {
        $group: {
          _id: "$user",
          bestWpm: { $max: "$wpm" },
        },
      },
      { $sort: { bestWpm: -1 } },
      { $limit: 10 },
    ]);

    const userIds = leaderboard.map((entry) => entry._id);
    const users = await require("../models/User")
      .find({ _id: { $in: userIds } })
      .select("username");

    const userMap = {};
    users.forEach((user) => {
      userMap[user._id] = user.username;
    });

    const populated = leaderboard.map((entry) => ({
      user: { _id: entry._id, username: userMap[entry._id] },
      bestWpm: entry.bestWpm,
    }));

    res.json(populated);
  } catch (error) {
    console.error("LEADERBOARD ERROR:", error);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

module.exports = router;
