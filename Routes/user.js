const express = require("express");
const router = express.Router();

// calling controller
const user_controller = require("../Controllers/user");

// routes

// GET request for a single user
router.get("/:id", user_controller.getUser);

// POST request for creating a user
router.post("/create", user_controller.createUser);

// PUT request for updating profile picture
router.put("/update", user_controller.updateUser);

// PUT request for updating profile picture
router.put("/subscribe", user_controller.subsribeToUser);

// PUT request for liking a video
router.put("/likeVideo", user_controller.likeVideo);

// PUT request for removing a like from a video
router.put("/removeVideoLike", user_controller.removeVideoLike);

// PUT request for disliking a video
router.put("/dislikeVideo", user_controller.dislikeVideo);

// PUT request for removing a dislike from a video
router.put("/removeVideoDisLike", user_controller.removeVideoDislike);

module.exports = router;
