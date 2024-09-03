import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Subject } from "./subject";

@Entity("exams")
export class Exam {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Subject, (subject) => subject.exams)
  @JoinTable()
  subjects: Subject[];
}
