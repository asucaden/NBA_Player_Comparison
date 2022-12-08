const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const Player = require('../../models/Player');
const PlayerComparison = require('../../models/PlayerComparison');

const { check, validationResult } = require('express-validator');
const { selectFields } = require('express-validator/src/select-fields');

//// STAT RANGES
// PTS Range- 10 - 30.6
const PTSMIN = 10;
const PTSMAX = 30.6;
// AST Range- .8 - 10.8
const ASTMIN = 0.8;
const ASTMAX = 10.8;
// TRB Range- 1.6 - 14.7
const TRBMIN = 1.6;
const TRBMAX = 14.7;
// StatTot Range- 12.7 - 48.8
const STATTOTMIN = 12.7;
const STATTOTMAX = 48.8;

const TOTSPREAD = 3;
const FAMEDIFF = 2;

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
      const ptsTarget =
        Math.random() * 0.92 * (PTSMAX - PTSMIN) + 1.08 * PTSMIN;
      const astTarget =
        Math.random() * 0.92 * (ASTMAX - ASTMIN) + 1.08 * ASTMIN;
      const trbTarget =
        Math.random() * 0.92 * (TRBMAX - TRBMIN) + 1.08 * TRBMIN;
      const totTarget = ptsTarget + astTarget + trbTarget;
      const ptsSpread = ptsTarget / 7;
      const astSpread = astTarget / 2;
      const trbSpread = trbTarget / 2;

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
        for (let j = 0; j < players.length * 3; j++) {
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
