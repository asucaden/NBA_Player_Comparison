const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const Player = require("../../models/Player");
const PlayerComparison = require("../../models/PlayerComparison");
const updateElo = require("../../utils/ELO");

const { check, validationResult } = require("express-validator");
const { selectFields } = require("express-validator/src/select-fields");
const { update } = require("../../models/User");
const fs = require("fs");

// These constants calibrate how 2 players are compared

// @route   GET api/playerComparison
// @desc    Return a player pair to pick a winner
// @access  Public
router.get("/", async (req, res) => {
  try {
    console.log("Getting pinged get/");
    let players = await Player.find({});
    let i = Math.floor(Math.random() * players.length);
    console.log("first player is: ", i);
    const player1 = players[i];
    i = Math.floor(Math.random() * players.length);
    let player2 = players[i];
    while (player1.id === player2.id) {
      i = Math.floor(Math.random() * players.length);
      console.log("i is", i);
      player2 = players[i];
    }

    console.log("Made it to end of get");
    res.json({
      player1,
      player2,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/playerComparison
// @desc    Say who you think won
// @access  Public
router.post(
  "/",
  [
    // TODO
    // Add checks to make sure users cant call this with players of their own choosing. Make sure player names are valid.
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log("Pinging post");
      // ELO update winner and loser's scores accordingly.
      // r1, r2, who won (1 or 2)
      // TODO, you could have 'pending' rankings stored in mongodb and then check if id in response equals one of the pending rankings.
      // cont. this would basically eliminate exploiting rankings by posting in whatever players you want
      // lol the exploit I'm worried about is exploitable in eloeverything.co
      // if it didnt stop that site (which actually has users) it shouldnt stop me

      const playerA = req.body.player1;
      const playerB = req.body.player2;

      console.log(playerA, playerB);

      const player1 = await Player.findOne({
        cm_name: { $eq: playerA },
      });

      const player2 = await Player.findOne({
        cm_name: { $eq: playerB },
      });
      console.log("Right before elo call");
      [player1.cm_fame, player2.cm_fame] = updateElo(
        player1.cm_fame,
        player2.cm_fame,
        req.body.winner
      );

      await player1.save();
      await player2.save();

      console.log("Made it to end of post/");

      res.json({ player1, player2 });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
