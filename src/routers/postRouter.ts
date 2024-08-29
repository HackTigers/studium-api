import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { postRepo } from "../database/database";

const router = express.Router();

// Create a new post
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { content } = req.body;
  const userId = (req as any).user.userId;

  try {
    const newPost = postRepo.create({
      user: { id: userId },
      content,
    });

    const savedPost = await postRepo.save(newPost);
    return res.status(201).json(savedPost);
  } catch (err) {
    return res.status(500).json({ message: "Error creating post", error: err.message });
  }
});

// Get all posts
router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await postRepo.find({ relations: ["user"] });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
});

// Get a single post by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await postRepo.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching post", error: err.message });
  }
});

// Update a post by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = (req as any).user.userId;

  try {
    const post = await postRepo.findOne({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.id !== userId) {
      return res.status(403).json({ message: "You can only edit your own posts" });
    }

    post.content = content;
    const updatedPost = await postRepo.save(post);

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json({ message: "Error updating post", error: err.message });
  }
});

// Delete a post by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.userId;

  try {
    const post = await postRepo.findOne({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.id !== userId) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    await postRepo.remove(post);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: "Error deleting post", error: err.message });
  }
});

export default router;
