// services/UserService.js
require("dotenv").config();
const mysql = require("mysql2");
const { createUser } = require("../models/User");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

const UserService = {
  getAllUsers: async () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM users", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getUserById: async (userId) => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM users WHERE id = ?", [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  getUserByEmail: async (userEmail) => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM users WHERE email = ?", [userEmail], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  createUser: async (userData) => {
    return new Promise((resolve, reject) => {
      const newUser = createUser(null, userData.name, userData.email, userData.password);

      pool.query("INSERT INTO users SET ?", newUser, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: results.insertId, ...newUser });
        }
      });
    });
  },

  updateUser: async (userId, updatedUserData) => {
    return new Promise((resolve, reject) => {
      pool.query("UPDATE users SET ? WHERE id = ?", [updatedUserData, userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(updatedUserData);
        }
      });
    });
  },

  deleteUser: async (userId) => {
    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM users WHERE id = ?", [userId], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  },
};

module.exports = UserService;
