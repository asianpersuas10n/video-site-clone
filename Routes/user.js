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

module.exports = router;
