import express, { Request, Response } from "express";

import jwt from "jsonwebtoken";
import { userRepo } from "../database/database";
import constants from "../utils/constants";

const router = express.Router()

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Fetch user by email
  const user = await userRepo.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Validate password
  const isValid = await user.validatePassword(password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, constants.JWT_SECRET , { expiresIn: "1h" });

  return res.json({ token });
});

export default router;
