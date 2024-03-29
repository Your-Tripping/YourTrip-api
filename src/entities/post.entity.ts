import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import { Comments } from "./comments.entity";
import { Likes } from "./likes.entity";
import { Place } from "./place.entity";
import { User } from "./user.entity";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  country: string;

  @Column()
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: "active" })
  status: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Place, (place) => place.post)
  places: Post[];

  @OneToMany(() => Comments, (Comment) => Comment.post)
  comments: Comments[];

  @OneToMany(() => Likes, (likes) => likes.post)
  likes: Likes[];
}
