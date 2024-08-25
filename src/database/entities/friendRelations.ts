import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { User } from "./user"

@Entity("friend_relations")
export class FriendRelation {
  constructor(id: string, user: User, friend: User, status: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.user = user;
    this.friend = friend;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User, user => user.id)
  user: User

  @ManyToOne(() => User, friend => friend.id)
  friend: User

  @Column()
  status: string  // e.g., "pending", "accepted", "blocked"

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
