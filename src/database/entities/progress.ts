import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user";
import { Chapter } from "./chapter";
import { Video } from "./video";
import { Quiz } from "./quiz";

@Entity("progress")
export class Progress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Chapter, (chapter) => chapter.id)
  chapter: Chapter;

  @ManyToOne(() => Video, (video) => video.id, { nullable: true })
  video: Video;

  @ManyToOne(() => Quiz, (quiz) => quiz.id, { nullable: true })
  quiz: Quiz;

  @Column({ type: "boolean" })
  completed: boolean;

  @Column({ type: "int" })
  progress: number; // Progress percentage

  @UpdateDateColumn()
  updatedAt: Date;
}
