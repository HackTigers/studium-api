import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany
} from "typeorm";
import bcrypt from "bcrypt"
import { Exam } from "./exam";

@Entity("users")
export class User {
  constructor(id: string, email: string, password: string, firstName: string, lastName: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string  // Remember to hash this before storing

  @Column({ nullable: false })
  firstName: string

  @Column({ nullable: false })
  lastName: string

  @Column({ nullable: true })
  profilePicture: string

  @ManyToMany(() => Exam)
  @JoinTable({
    name: "user_exams", // Name of the join table
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "exam_id",
      referencedColumnName: "id"
    }
  })
  enrolledExams: Exam[];

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  async setEnrolledExams(exams: Exam[]) {
    this.enrolledExams = exams;
  }
}