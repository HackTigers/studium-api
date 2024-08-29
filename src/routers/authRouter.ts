import express, { Request, Response } from "express";

import jwt from "jsonwebtoken";
import { examRepo, userRepo } from "../database/database";
import constants from "../utils/constants";
import { validateEmail } from "../utils/validation";

const router = express.Router()

router.post("/login", async (req: Request, res: Response) => {
  if(!req.body) {
    return res.status(400).json({ message: "Request body is required", success: false });
  }

  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(400).json({ message: "Email and password are required", success: false });
  }
  if(!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email", success: false });
  }

  // Fetch user by email
  const user = await userRepo.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials", success: false });
  }

  // Validate password
  const isValid = await user.validatePassword(password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials", success: false });
  }

  // Generate JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, constants.JWT_SECRET , { expiresIn: "1h" });

  return res.json({ token, success: true });
});

router.post("/register", async (req: Request, res: Response) => {
  if(!req.body) {
    return res.status(400).json({ message: "Request body is required", success: false });
  }

  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const profilePicture = req.body.profilePicture;
  const enrolledExams = req.body.enrolledExams;

  if(!email || !password || !firstName || !lastName || !enrolledExams) {
    return res.status(400).json({ message: "Email, Password, First Name, Last Name, Profile Picture, Enrolled Exams are required", success: false });
  }

  if(!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email", success: false });
  }

  // Check if user already exists
  const existingUser = await userRepo.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists", success: false });
  }

  // Create new user
  const newUser = userRepo.create({
    email,
    firstName,
    lastName,
    profilePicture,
  });

  //todo: find out how to save enrolled exams since this wants an exam object
  // const exams = await examRepo.findBy({
  //     id: {
  //       $in: enrolledExams
  //     }
  // })

  await newUser.setEnrolledExams(enrolledExams);

  await newUser.setPassword(password);
  const savedUser = await userRepo.save(newUser);

  return res.status(201).json({ message: "User created successfully", success: true });
});

export default router;
