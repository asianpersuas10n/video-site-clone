const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../Models");
const User = db.User;

/*
 * example
 * exports.whatItsFor = asyncHandler(async(req, res) => {
 *  some sequelize query here
 *  res.json(whatever you needed to get here)
 * })
 */

// POST request for creating a user
exports.createUser = asyncHandler(async (req, res) => {
  const body = req.body;
  await User.create({
    uid: body.uid,
    photoURL: body.photoURL,
    email: body.email,
    displayName: body.displayName,
  });
  res.json(`user ${body.displayName} created`);
});

// PUT request for updating a users google profile picture
exports.updateUser = asyncHandler(async (req, res) => {
  const body = req.body;
  await User.update({ photoURL: body.photoURL }, { where: { id: body.id } });
  res.json(`photoURL updated to ${body.photoURL}`);
});

// GET request for getting a user
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.url } });
  res.json(user);
});
