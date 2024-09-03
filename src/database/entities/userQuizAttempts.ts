import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user";
import { Quiz } from "./quiz";

@Entity("user_quiz_attempts")
export class UserQuizAttempt {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.id)
  quiz: Quiz;

  @Column({ type: "int" })
  score: number;

  @Column({ type: "date" })
  attemptDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
