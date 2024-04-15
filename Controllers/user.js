const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../Models");
const User = db.User;
const Video = db.Video;

/*
 * example
 * exports.whatItsFor = asyncHandler(async(req, res) => {
 *  some sequelize query here
 *  res.json(whatever you needed to get here)
 * })
 */

// probably

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

// PUT request to subscribe to another user.
exports.subsribeToUser = asyncHandler(async (req, res) => {
  const subscribedUser = await User.findOne({
    where: { id: req.body.subscribedUser.id },
  });
  const subscribingUser = await User.findOne({
    where: { id: req.body.subscribingUser.id },
  });
  await subscribedUser.addSubscribers(subscribingUser);
  res.json(
    `${subscribingUser.displayName} has subscribed to ${subscribedUser.displayName}`
  );
});

// PUT request to like a video
exports.likeVideo = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.body.user.id } });
  const video = await Video.findOne({ where: { id: req.body.video.id } });
  const alreadyLiked = await user.hasLikes(video);
  const alreadyDisliked = await user.hasDislikes(video);
  let dislikedBool = false;

  if (alreadyLiked) {
    res.json(`${user.displayName} already liked ${video.title}`);
  } else if (alreadyDisliked) {
    await user.removeDislikes(video);
    dislikedBool = true;
  }

  await user.addLikes(video);
  res.json(
    `${user.displayName} has liked ${video.title} ${
      dislikedBool ? `and removed it from its dislike list` : ""
    }`
  );
});

// PUT request to remove a like from a video
exports.removeVideoLike = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.body.user.id } });
  const video = await Video.findOne({ where: { id: req.body.video.id } });
  await user.removeLikes(video);
  res.json(`${user.displayName} has removed ${video.title} from the like list`);
});

// PUT request to dislike a video
exports.dislikeVideo = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.body.user.id } });
  const video = await Video.findOne({ where: { id: req.body.video.id } });
  const alreadyLiked = await user.hasLikes(video);
  const alreadyDisliked = await user.hasDislikes(video);
  let likedBool = false;

  if (alreadyDisliked) {
    res.json(`${user.displayName} already disliked ${video.title}`);
  } else if (alreadyLiked) {
    await user.removeLikes(video);
    likedBool = true;
  }

  await user.addDislikes(video);
  res.json(
    `${user.displayName} has disliked ${video.title} ${
      likedBool ? `and removed it from its like list` : ""
    }`
  );
});

// PUT request to remove a dislike from a video
exports.removeVideoDislike = asyncHandler(async (req, res) => {
  const user = await User.findOne({ where: { id: req.body.user.id } });
  const video = await Video.findOne({ where: { id: req.body.video.id } });
  await user.removeDislikes(video);
  res.json(
    `${user.displayName} has removed ${video.title} from the dislike list`
  );
});

// GET request for getting a user
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.url.replace("/", "") },
    include: { all: true },
  });
  res.json(user);
});
