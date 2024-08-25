import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { Chapter } from "./chapter"

@Entity("quizzes")
export class Quiz {
  constructor(id: string, chapter: Chapter, title: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.chapter = chapter;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Chapter, chapter => chapter.id)
  chapter: Chapter

  @Column()
  title: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
