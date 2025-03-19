import express from "express";
import { registerUser } from "../controllers/user.controller.js"; // Ensure correct import
import { body } from "express-validator";

const router = express.Router();

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("fullname.firstname").isLength({ min: 3 }).withMessage("Firstname must be at least 3 characters long"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    registerUser // Ensure registerUser is properly imported
);

export default router;
