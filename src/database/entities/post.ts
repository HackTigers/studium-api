import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user"

@Entity("posts")
export class Post {
  constructor(id: string, user: User, content: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.user = user;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User, user => user.id)
  user: User

  @Column({ type: "text" })
  content: string  // This is where the tweet-like content is stored

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
