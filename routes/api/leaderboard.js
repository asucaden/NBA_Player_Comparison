const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Player = require("../../models/Player");
const PlayerComparison = require("../../models/PlayerComparison");

const { check, validationResult } = require("express-validator");
const { selectFields } = require("express-validator/src/select-fields");

// @route   GET api/playerComparison
// @desc    Return a player pair to pick a winner
// @access  Public
router.get("/", async (req, res) => {
  try {
    console.log("Getting pinged get/");
    let players = await Player.find({});
    console.log("Got all players");
    const leaderboard = players.map((player) => {
      return {
        cm_name: player.cm_name,
        cm_fame: player.cm_fame,
        pts: player.pts,
        reb: player.reb,
        ast: player.ast,
        ts: player.cm_ts_pct,
      };
    });
    res.json({
      leaderboard,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
