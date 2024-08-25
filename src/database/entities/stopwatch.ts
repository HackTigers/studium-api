import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user"

@Entity("stopwatches")
export class Stopwatch {
  constructor(id: string, user: User, timeSpent: number, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.user = user;
    this.timeSpent = timeSpent;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User, user => user.id)
  user: User

  @Column({ type: "int" })
  timeSpent: number  // Time spent in seconds

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
