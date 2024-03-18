const express = require("express");
const router = express.Router();

// calling controller
const video_controller = require("../Controllers/videos");

// routes

// GET request for a single video
router.get("/:id", video_controller.videoDetail);

// POST request for creating a video
router.post("/create", video_controller.createVideoPost);

/*
 *
 * likes will probably have to be robust and need their own model
 *
 */

// PUT request for incrementing likes
router.put("/likes", video_controller.videoLikeIncrement);

// PUT request for decrementing likes
router.put("/dislikes", video_controller.videoLikeDecrement);

// PUT request for incrementing views
router.put("/views", video_controller.videoViewIncrement);

// PUT request for changing the thumbnail
router.put("/update/thumbnail", video_controller.videoThumbnailUpdate);

// PUT request for updating a video
router.put("/update/:id", video_controller.videoUpdate);

// DELETE request for a video
router.delete("/delete", video_controller.deleteVideo);

// GET request for all videos
router.get("/", video_controller.getHomeVideos);

module.exports = router;
