import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { Quiz } from "./quiz"

@Entity("questions")
export class Question {
  constructor(id: string, quiz: Quiz, text: string, answer: string, aiAnswer: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.quiz = quiz;
    this.text = text;
    this.answer = answer;
    this.aiAnswer = aiAnswer;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Quiz, quiz => quiz.id)
  quiz: Quiz

  @Column({ type: "text" })
  text: string

  @Column({ type: "text", nullable: true })
  answer: string

  @Column({ type: "text", nullable: true })
  aiAnswer: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
