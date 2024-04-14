const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../Models");
const Video = db.Video;
const User = db.User;

// GET request for all for the home page
exports.getHomeVideos = asyncHandler(async (req, res) => {
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
        thumbnail: req.body.thumbnail,
        duration: req.body.duration,
        fireURL: req.body.fireURL,
        UserId: req.body.UserId,
      });
      res.json("video created");
      // no redirect res.redirect(video.url);
    }
  }),
];

/*
 *
 * likes will probably have to be robust and need their own model
 *
 */

// PUT request to increment a videos likes
exports.videoLikeIncrement = asyncHandler(async (req, res) => {
  await Video.increment({ likes: 1 }, { where: { id: req.body.id } });
  res.json("incremented likes");
});

// PUT request to decrament a videos likes
exports.videoLikeDecrement = asyncHandler(async (req, res) => {
  await Video.increment({ likes: -1 }, { where: { id: req.body.id } });
  res.json("decremented likes");
});

// PUT request to increment a videos views
exports.videoViewIncrement = asyncHandler(async (req, res) => {
  await Video.increment({ views: 1 }, { where: { id: req.body.id } });
  res.json("incremented views");
});

// PUT request to update a thumbnail
exports.videoThumbnailUpdate = asyncHandler(async (req, res) => {
  await Video.update(
    { thumbnail: req.body.thumbnail },
    { where: { id: req.body.id } }
  );
  res.json(`Updated thumbnail to ${req.body.thumbnail}`);
});

// PUT request to update a video title and description
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

// DELETE request to delete a video
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
