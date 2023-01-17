import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Post } from "./post.entity";

@Entity("places")
export class Place {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  imageUrl: string;

  @Column()
  description: string;

  @ManyToOne(() => Post, (post) => post.places)
  post: Post;
}
