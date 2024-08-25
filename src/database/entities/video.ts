import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { Chapter } from "./chapter"

@Entity("videos")
export class Video {
  constructor(id: string, chapter: Chapter, title: string, youtubeLink: string, duration: number, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.chapter = chapter;
    this.title = title;
    this.youtubeLink = youtubeLink;
    this.duration = duration;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Chapter, chapter => chapter.id)
  chapter: Chapter

  @Column()
  title: string

  @Column()
  youtubeLink: string

  @Column({ type: "int" })
  duration: number  // Duration in seconds

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
