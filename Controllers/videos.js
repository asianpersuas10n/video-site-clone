const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../Models");
const Video = db.Video;
const User = db.User;

/*
 * example
 * exports.whatItsFor = asyncHandler(async(req, res) => {
 *  some sequelize query here
 *  res.json(whatever you needed to get here)
 * })
 */

// GET request for all for the home page
exports.getHomeVideos = asyncHandler(async (req, res) => {
  console.log("test");
  const allVideos = await Video.findAll({ include: User }); // need to rewrite to be pagination call 30 at a time
  res.json(allVideos);
});

// GET request for a single video
exports.videoDetail = asyncHandler(async (req, res, next) => {
  const video = await Video.findOne({
    where: { id: req.url.replace("/", "") },
    include: { all: true },
  });

  if (video === null) {
    // No results.
    const err = new Error("Video not found");
    err.status = 404;
    return next(err);
  }

  res.json(video);
});

// POST request to create a video
exports.createVideoPost = [
  body("title", "Video name must be at least one character long.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json("error was made");
      return;
    } else {
      await Video.create({
        title: req.body.title,
        description: req.body.description,
      });
      res.json("video created");
      // no redirect res.redirect(video.url);
    }
  }),
];

// PUT request to update a video
exports.videoUpdate = asyncHandler(async (req, res) => {
  /*
   *
   * Need to verify user
   *
   */

  const ID = req.url.replace("/update/", "");
  await Video.update(
    { title: req.body.title, description: req.body.description },
    {
      where: { id: ID },
    }
  );
  res.json(
    `Updated title ${req.body.title} and description ${req.body.description}`
  );
});

// Delete request to delete a video
exports.deleteVideo = asyncHandler(async (req, res) => {
  /*
   *
   * Need to verify user
   * currently req.body.title won't actually have anyting
   *
   */
  await Video.destroy({
    where: {
      id: req.body.id,
    },
  });
  res.json(`Video ${req.body.title} id:${req.body.id} removed`);
});
