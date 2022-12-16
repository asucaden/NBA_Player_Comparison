const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const Player = require('../../models/Player');
const PlayerComparison = require('../../models/PlayerComparison');

const { check, validationResult } = require('express-validator');
const { selectFields } = require('express-validator/src/select-fields');

// These constants calibrate how 2 players are compared
const TOTSPREAD = 2; // Controls how similar the 2 players pts+asts+rebs must be.  Lower means closer stats.
const FAMEDIFF = 1; // Controls how different the 2 players fame can be.  Lower means more similar fame levels is allowed

//// STAT RANGES
// PTS Range- 10 - 30.6
const PTSMIN = 12;
const PTSMAX = 28;
// AST Range- .8 - 10.8
const ASTMIN = 2;
const ASTMAX = 9;
// TRB Range- 1.6 - 14.7
const TRBMIN = 3;
const TRBMAX = 10;
// StatTot Range- 12.7 - 48.8
const STATTOTMIN = 12.7;
const STATTOTMAX = 48.8;

// @route   GET api/playerComparison
// @desc    Return a potential player pair
// @access  Private
router.get('/', auth, async (req, res) => {
  console.log('Getting pinged');
  var players = [];
  try {
    var famousPlayer = {};
    var sleeperPlayer = {};
    var minFame = 0;
    var maxFame = 0;
    var i = 0;
    var checkAgain = true;
    while (checkAgain) {
      i++;
      const ptsTarget = Math.random() * (PTSMAX - PTSMIN) + PTSMIN;
      const astTarget = Math.random() * (ASTMAX - ASTMIN) + ASTMIN;
      const trbTarget = Math.random() * (TRBMAX - TRBMIN) * TRBMIN;
      const totTarget = ptsTarget + astTarget + trbTarget;
      const ptsSpread = ptsTarget / 5;
      const astSpread = astTarget / 3;
      const trbSpread = trbTarget / 3;

      players = await Player.find({
        PTS: { $gte: ptsTarget - ptsSpread, $lte: ptsTarget + ptsSpread },
        AST: { $gte: astTarget - astSpread, $lte: astTarget + astSpread },
        TRB: { $gte: trbTarget - trbSpread, $lte: trbTarget + trbSpread },
        '3StatTot': {
          $gte: totTarget - TOTSPREAD,
          $lte: totTarget + TOTSPREAD,
        },
      });
      if (players.length >= 2) {
        for (let j = 0; j < Math.min(players.length ** 2, 100); j++) {
          let idx1 = Math.floor(Math.random() * players.length);
          let idx2 = Math.floor(Math.random() * players.length);
          const f1 = players[idx1].FAME_SCORE;
          const f2 = players[idx2].FAME_SCORE;
          if (Math.abs(f1 - f2) > FAMEDIFF) {
            if (f1 > f2) {
              famousPlayer = players[idx1];
              sleeperPlayer = players[idx2];
            } else {
              famousPlayer = players[idx2];
              sleeperPlayer = players[idx1];
            }
            checkAgain = false;
            break;
          }
        }
      }
    }
    console.log('Took' + i + 'tries');
    res.json({
      sleeperPlayer: {
        Player: sleeperPlayer.Player,
        PTS: sleeperPlayer.PTS,
        AST: sleeperPlayer.AST,
        TRB: sleeperPlayer.TRB,
      },
      famousPlayer: {
        Player: famousPlayer.Player,
        PTS: famousPlayer.PTS,
        AST: famousPlayer.AST,
        TRB: famousPlayer.TRB,
      },
      tryCount: i,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/playerComparison
// @desc    Post a player pair for tweeting
// @access  Private
router.post(
  '/',
  [
    check('sleeperPlayer', 'Must include a sleeper player').exists(),
    check('famousPlayer', 'Must include a famous player').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newComparison = new PlayerComparison({
        playerA: req.body.sleeperPlayer,
        playerB: req.body.famousPlayer,
      });
      await newComparison.save();
      res.json({ newComparison });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
