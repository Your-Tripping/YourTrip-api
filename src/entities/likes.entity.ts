import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity("likes")
export class Likes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;
}
