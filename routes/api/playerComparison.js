const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const Player = require('../../models/Player');
const PlayerComparison = require('../../models/PlayerComparison');

const { check, validationResult } = require('express-validator');
const { selectFields } = require('express-validator/src/select-fields');

// These constants calibrate how 2 players are compared
const TOTSPREAD = 5; // Controls how similar the 2 players pts+asts+rebs must be.  Lower means players must be closer statisticly.
const FAMEDIFF = 1; // Controls how different the 2 players fame can be.  Lower means more similar fame levels is allowed
const TSSPREAD = 0.08; // Controls how different the 2 players TS% can be.

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
      const ptsSpread = ptsTarget / 4;
      const astSpread = astTarget / 3;
      const trbSpread = trbTarget / 3;

      players = await Player.find({
        pts: { $gte: ptsTarget - ptsSpread, $lte: ptsTarget + ptsSpread },
        ast: { $gte: astTarget - astSpread, $lte: astTarget + astSpread },
        reb: { $gte: trbTarget - trbSpread, $lte: trbTarget + trbSpread },
        cm_3_stat_tot: {
          $gte: totTarget - TOTSPREAD,
          $lte: totTarget + TOTSPREAD,
        },
      });
      if (players.length >= 2) {
        for (let j = 0; j < Math.min(players.length ** 3, 200); j++) {
          let idx1 = Math.floor(Math.random() * players.length);
          let idx2 = Math.floor(Math.random() * players.length);
          const p1 = players[idx1];
          const p2 = players[idx2];
          if (
            Math.abs(p1.cm_fame - p2.cm_fame) > FAMEDIFF &&
            Math.abs(p1.cm_ts_pct - p2.cm_ts_pct) < TSSPREAD
          ) {
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
        cm_name: sleeperPlayer.cm_name,
        pts: Math.round(sleeperPlayer.pts * 10) / 10,
        ast: Math.round(sleeperPlayer.ast * 10) / 10,
        reb: Math.round(sleeperPlayer.reb * 10) / 10,
        cm_ts_pct: Math.round(sleeperPlayer.cm_ts_pct * 1000) / 10,
      },
      famousPlayer: {
        cm_name: famousPlayer.cm_name,
        pts: Math.round(famousPlayer.pts * 10) / 10,
        ast: Math.round(famousPlayer.ast * 10) / 10,
        reb: Math.round(famousPlayer.reb * 10) / 10,
        cm_ts_pct: Math.round(famousPlayer.cm_ts_pct * 1000) / 10,
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
