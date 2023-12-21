// controllers/UserController.js
const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = {
  getAllUsers: async (req, res) => {
    const users = await UserService.getAllUsers();
    res.json(users);
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    res.json(user);
  },

  getUserByEmail: async (req, res) => {
    const userEmail = req.params.email;
    const user = await UserService.getUserByEmail(userEmail);
    res.json(user);
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        res.status(401).json({ error: "Incorrect password" });
      } else {
        const payload = {
          id: user.id,
          email: user.email,
        };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
        res.json({ token });
      }
    }
  },

  createUser: async (req, res) => {
    const userData = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashedPassword;
    const newUser = await UserService.createUser(userData);
    res.json(newUser);
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    const updatedUser = await UserService.updateUser(userId, updatedUserData);
    res.json(updatedUser);
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;
    await UserService.deleteUser(userId);
    res.sendStatus(204); // No Content
  },
};

module.exports = UserController;
