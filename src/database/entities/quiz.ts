import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Chapter } from "./chapter";

@Entity("quizzes")
export class Quiz {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.id)
  chapter: Chapter;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
