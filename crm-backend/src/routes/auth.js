// src/routes/auth.js
const router = require("express").Router();
const { body } = require("express-validator");
const {
  register,
  login,
  me,
  changePassword,
} = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");
const { validate } = require("../middleware/errorHandler");

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
    body("role")
      .optional()
      .isIn(["admin", "manager", "agent"])
      .withMessage("Invalid role"),
    validate,
  ],
  register,
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
    validate,
  ],
  login,
);

router.get("/me", authenticate, me);

router.post(
  "/change-password",
  authenticate,
  [
    body("currentPassword").notEmpty().withMessage("Current password required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password min 6 chars"),
    validate,
  ],
  changePassword,
);

module.exports = router;
