const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../Models");
const Subscriber = db.Subscriber;

/*
 * example
 * exports.whatItsFor = asyncHandler(async(req, res) => {
 *  some sequelize query here
 *  res.json(whatever you needed to get here)
 * })
 */
