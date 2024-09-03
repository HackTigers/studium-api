import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Chapter } from "./chapter";

@Entity("videos")
export class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.id)
  chapter: Chapter;

  @Column()
  title: string;

  @Column()
  youtubeLink: string;

  @Column({ type: "int" })
  duration: number; // Duration in seconds

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
