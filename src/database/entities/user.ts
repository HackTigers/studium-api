import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Exam } from "./exam";
import { Class } from "./class";
import bcrypt from "bcrypt";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  profilePicture: string;

  // @OneToMany(() => Exam, (exam) => exam.id)
  @ManyToMany(() => Exam)
  @JoinTable()
  enrolledExams: Exam[];

  @Column({ default: "student" })
  role: string;

  @ManyToOne(() => Class, (userClass) => userClass.id)
  class: Class;

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
}
