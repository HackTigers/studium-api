import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user"
import { Post } from "./post"  // Assuming there's a Post entity, you can adjust accordingly

@Entity("comments")
export class Comment {
  constructor(id: string, user: User, post: Post, content: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.user = user;
    this.post = post;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User, user => user.id)
  user: User

  @ManyToOne(() => Post, post => post.id)
  post: Post

  @Column({ type: "text" })
  content: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
