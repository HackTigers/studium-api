import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("classes")
export class Class {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
}
