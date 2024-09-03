import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Exam } from "./exam";
import { Chapter } from "./chapter";

@Entity("subjects")
export class Subject {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Exam, (exam) => exam.subjects)
  exams: Exam[];

  @OneToMany(() => Chapter, (chapter) => chapter.subject)
  chapters: Chapter[];
}
