const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const { check, validationResult } = require('express-validator');
const { selectFields } = require('express-validator/src/select-fields');




module.exports = router;
