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
router.post("/update", user_controller.updateUser);

module.exports = router;
