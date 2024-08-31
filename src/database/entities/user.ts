import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinTable,
} from "typeorm";
import bcrypt from "bcrypt";
import { Exam } from "./exam";
import { Class } from "./class";

@Entity("users")
export class User {
  constructor(
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Remember to hash this before storing

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  profilePicture: string;

  @OneToMany(() => Exam, (exam) => exam.users)
  @JoinTable()
  enrolledExams: Exam[];

  @OneToOne(() => Class)
  class: Class;

  @Column({ default: "student" })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  async setEnrolledExams(exams: Exam[]) {
    this.enrolledExams = exams;
  }

  async setClass(userClass: Class) {
    this.class = userClass;
  }
}
