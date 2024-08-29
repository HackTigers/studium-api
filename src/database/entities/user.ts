import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import bcrypt from "bcrypt"
import { Quiz } from "./quiz";
import { JoinTable, ManyToMany } from "typeorm/browser";

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

  // @ManyToMany(() => Quiz)
  // @JoinTable({
  //   name: "user_quizzes", // Name of the join table
  //   joinColumn: {
  //     name: "user_id",
  //     referencedColumnName: "id"
  //   },
  //   inverseJoinColumn: {
  //     name: "quiz_id",
  //     referencedColumnName: "id"
  //   }
  // })
  // enrolledExams: Quiz[];

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
}