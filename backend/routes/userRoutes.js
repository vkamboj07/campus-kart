const express = require("express");
const router = express.Router();
const { signupUser, getUserById, loginUser, updateUser, deleteUser } = require("../controllers/userController");

router.post("/", signupUser);
router.get("/:id", getUserById);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
