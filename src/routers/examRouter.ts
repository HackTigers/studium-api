import express, { Request, Response } from "express";
import { adminAuthMiddleware, authMiddleware } from "../middleware/auth";
import { examRepo } from "../database/database";

const router = express.Router();

// CREATE - Add a new exam
router.post("/", adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, subjects } = req.body;
    if (!name || !subjects) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newExam = examRepo.create({
      name,
      subjects,
    });
    res.status(201).json(newExam);
  } catch (error) {
    res.status(400).json({ message: "Error creating exam", error });
  }
});

// READ - Get all exams
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const exams = await examRepo.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exams", error });
  }
});

// READ - Get a single exam by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const exam = await examRepo.findOne({
      where: { id: req.params.id },
    });
    if (exam) {
      res.json(exam[0]);
    } else {
      res.status(404).json({ message: "Exam not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam", error });
  }
});

// UPDATE - Update an exam by ID
router.put("/:id", adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, subjects } = req.body;
    if (!name || !subjects) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updated = await examRepo.update(req.params.id, {
      name,
      subjects,
    });

    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ message: "Exam not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating exam", error });
  }
});

// DELETE - Delete an exam by ID
router.delete(
  "/:id",
  adminAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const deleted = await examRepo.delete({
        id: req.params.id,
      });

      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Exam not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting exam", error });
    }
  }
);

export default router;
