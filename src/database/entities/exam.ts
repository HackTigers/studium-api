import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user";
import { Subject } from "./subject";

@Entity("exams")
export class Exam {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  date: Date;

  @ManyToMany(() => Subject, (subject) => subject.exams)
  subjects: Subject[];

  @ManyToMany(() => User, (user) => user.enrolledExams)
  users: User[];
}
