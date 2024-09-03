import express, { Request, Response } from "express";
import { adminAuthMiddleware, authMiddleware } from "../middleware/auth";
import { chapterRepo } from "../database/database";

const router = express.Router();

// CREATE - Add a new chapter
router.post("/", adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, index, aliases } = req.body;

    if (!title || !description || !index || !aliases) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newChapter = chapterRepo.create({
      title,
      description,
      index,
      aliases,
    });

    await chapterRepo.save(newChapter);
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(400).json({ message: "Error creating chapter", error });
  }
});

// READ - Get all chapters
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const chapters = await chapterRepo.find();
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chapters", error });
  }
});

// READ - Get a single chapter by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const chapter = await chapterRepo.findOne({
      where: { id: req.params.id },
    });
    if (chapter) {
      res.json(chapter);
    } else {
      res.status(404).json({ message: "Chapter not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching chapter", error });
  }
});

// UPDATE - Update a chapter by ID
router.put("/:id", adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, index, aliases } = req.body;
    if (!title || !description || !index || !aliases) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updated = await chapterRepo.update(req.params.id, {
      title,
      description,
      index,
      aliases,
    });

    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ message: "Chapter not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating chapter", error });
  }
});

// DELETE - Delete a chapter by ID
router.delete(
  "/:id",
  adminAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const deleted = await chapterRepo.delete({
        id: req.params.id,
      });

      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Chapter not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting chapter", error });
    }
  }
);

export default router;
