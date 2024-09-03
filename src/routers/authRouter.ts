import express, { Request, Response } from "express";
import { In } from "typeorm";
import jwt from "jsonwebtoken";

import constants from "../utils/constants";
import { classRepo, examRepo, userRepo } from "../database/database";
import {
  validateEmail,
  validatePassword,
  validateUrl,
  validateUsername,
} from "../utils/validation";

const router = express.Router();
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    // Check if identifier (username or email) and password are provided
    if (!identifier || !password) {
      return res.status(400).json({
        message: "Username/email and password are required",
        success: false,
      });
    }

    // Determine if the identifier is an email or a username
    const isEmail = validateEmail(identifier);
    let user;

    if (isEmail) {
      // If it's an email, find the user by email
      user = await userRepo.findOne({ where: { email: identifier } });
    } else {
      // If it's a username, find the user by username
      user = await userRepo.findOne({ where: { username: identifier } });
    }

    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist", success: false });
    }

    // Validate password
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      constants.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return user details and token
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        class: user.class,
        enrolledExams: user.enrolledExams,
      },
      success: true,
    });
  } catch (e) {
    console.error("Login error:", e);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Request body is required", success: false });
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const profilePicture = req.body.profilePicture;
    const enrolledExamsIds = req.body.enrolledExams;
    const classId: string = req.body.class;

    if (
      !email ||
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !enrolledExamsIds ||
      enrolledExamsIds.length === 0
    ) {
      return res.status(400).json({
        message:
          "Email, Username, Password, First Name, Last Name, Profile Picture, Enrolled Exams are required",
        success: false,
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }

    if (!validateUrl(profilePicture)) {
      return res
        .status(400)
        .json({ message: "Invalid profile picture URL", success: false });
    }

    if (!validateUsername(username)) {
      return res
        .status(400)
        .json({ message: "Invalid username", success: false });
    }

    // Check if user already exists
    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }

    const userExams = await examRepo.find({
      where: {
        id: In(enrolledExamsIds),
      },
    });

    if (userExams.length !== enrolledExamsIds.length) {
      return res
        .status(404)
        .json({ message: "One or more exams do not exist", success: false });
    }
    const userClass = await classRepo.findOne({ where: { id: classId } });

    if (!userClass) {
      return res
        .status(404)
        .json({ message: "Class does not exist", success: false });
    }

    // Create new user
    const newUser = userRepo.create({
      email,
      username,
      firstName,
      lastName,
      profilePicture,
      role: "student",
      class: userClass,
      enrolledExams: userExams,
    });

    // await newUser.setEnrolledExams(userExams);
    await newUser.setPassword(password);
    const savedUser = await userRepo.save(newUser);

    const token = jwt.sign(
      { userId: savedUser.id, email: savedUser.email },
      constants.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        profilePicture: savedUser.profilePicture,
        class: savedUser.class,
        enrolledExams: savedUser.enrolledExams,
      },
      success: true,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});

router.post("/validate-token", (req: Request, res: Response) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token is required", success: false });
    }

    jwt.verify(token, constants.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Invalid or expired token", success: false });
      }

      const user = await userRepo.findOne({ where: { id: decoded.userId } });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User does not exist", success: false });
      }

      // Token is valid
      return res.json({
        valid: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
          class: user.class,
          enrolledExams: user.enrolledExams,
        },
        success: true,
      });
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});

export default router;
