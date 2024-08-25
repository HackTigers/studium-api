import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user"
import { Question } from "./question"

@Entity("answers")
export class Answer {
  constructor(id: string, user: User, question: Question, answerText: string, isCorrect: boolean, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.user = user;
    this.question = question;
    this.answerText = answerText;
    this.isCorrect = isCorrect;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User, user => user.id)
  user: User

  @ManyToOne(() => Question, question => question.id)
  question: Question

  @Column({ type: "text" })
  answerText: string

  @Column({ type: "boolean" })
  isCorrect: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
