import express, { Request, Response } from "express";
import { adminAuthMiddleware, authMiddleware } from "../middleware/auth";
import { subjectRepo } from "../database/database";

const router = express.Router();

// Get all subjects (accessible to all authenticated users)
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const subjects = await subjectRepo.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subjects", error });
  }
});

// Get a specific subject by ID (accessible to all authenticated users)
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const subject = await subjectRepo.findOne({
      where: { id: req.params.id },
    });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subject", error });
  }
});

// Create a new subject (admin only)
router.post("/", adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newSubject = subjectRepo.create({
      name,
    });
    const result = await subjectRepo.save(newSubject);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating subject", error });
  }
});

router.put("/:id", adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updated = await subjectRepo.update(req.params.id, {
      name,
    });

    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating Subject", error });
  }
});

// Delete a subject (admin only)
router.delete(
  "/:id",
  adminAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const result = await subjectRepo.delete(req.params.id);
      if (result.affected === 0) {
        return res.status(404).json({ message: "Subject not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting subject", error });
    }
  }
);

export default router;
