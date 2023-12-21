const express = require("express");
const router = express.Router();
const UserController = require("./controllers/UserController");
const authMiddleware = require("./middleware/authMiddleware");

router.get("/users", authMiddleware, UserController.getAllUsers);
router.get("/users/:id", authMiddleware, UserController.getUserById);
router.post("/users", authMiddleware, UserController.createUser);
router.put("/users/:id", authMiddleware, UserController.updateUser);
router.delete("/users/:id", authMiddleware, UserController.deleteUser);
router.post("/users/login", UserController.loginUser);

module.exports = router;
