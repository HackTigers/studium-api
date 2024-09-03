import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Quiz } from "./quiz";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.id)
  quiz: Quiz;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "text", nullable: true })
  answer: string;

  @Column({ type: "text", nullable: true })
  aiAnswer: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
