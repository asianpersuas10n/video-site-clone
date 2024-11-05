const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../Models");
const Comment = db.Comment;

/*
 * example
 * exports.whatItsFor = asyncHandler(async(req, res) => {
 *  some sequelize query here
 *  res.json(whatever you needed to get here)
 * })
 */

/*
 * create comments
 * edit comments
 * delete comments
 * create tie a comment to head comment
 *
 */
