import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user"
import { Chapter } from "./chapter"
import { Video } from "./video"
import { Quiz } from "./quiz"

@Entity("progress")
export class Progress {
  constructor(id: string, user: User, chapter: Chapter, video: Video, quiz: Quiz, completed: boolean, progress: number, updatedAt: Date) {
    this.id = id;
    this.user = user;
    this.chapter = chapter;
    this.video = video;
    this.quiz = quiz;
    this.completed = completed;
    this.progress = progress;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User, user => user.id)
  user: User

  @ManyToOne(() => Chapter, chapter => chapter.id)
  chapter: Chapter

  @ManyToOne(() => Video, video => video.id, { nullable: true })
  video: Video

  @ManyToOne(() => Quiz, quiz => quiz.id, { nullable: true })
  quiz: Quiz

  @Column({ type: "boolean" })
  completed: boolean

  @Column({ type: "int" })
  progress: number  // Progress percentage

  @UpdateDateColumn()
  updatedAt: Date
}
