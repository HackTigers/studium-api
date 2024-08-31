import express, { Request, Response } from "express";
import { adminAuthMiddleware, authMiddleware } from "../middleware/auth";
import { classRepo } from "../database/database";

const router = express.Router();

// Get all classes (accessible to all authenticated users)
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const classes = await classRepo.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes", error });
  }
});

// Get a specific class by ID (accessible to all authenticated users)
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const classEntity = await classRepo.findOne({
      where: { id: req.params.id },
    });
    if (!classEntity) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json(classEntity);
  } catch (error) {
    res.status(500).json({ message: "Error fetching class", error });
  }
});

// Create a new class (admin only)
router.post("/", adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newClass = classRepo.create({
      name,
    });
    const result = await classRepo.save(newClass);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating class", error });
  }
});

// Update a class (admin only)
router.put("/:id", adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updated = await classRepo.update(req.params.id, {
      name,
    });

    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating class", error });
  }
});

// Delete a class (admin only)
router.delete(
  "/:id",
  adminAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const result = await classRepo.delete(req.params.id);
      if (result.affected === 0) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting class", error });
    }
  }
);

export default router;
