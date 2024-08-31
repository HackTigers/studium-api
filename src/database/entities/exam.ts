import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { Subject } from "./subject";

@Entity("exams")
export class Exam {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Subject, (subject) => subject.exams)
  subjects: Subject[];

  @OneToMany(() => User, (user) => user.enrolledExams)
  users: User[];
}
