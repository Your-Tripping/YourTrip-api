import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { hashSync } from "bcryptjs";
import { Post } from "./post.entity";
import { Comments } from "./comments.entity";
import { Likes } from "./likes.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 360, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column()
  bio: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  @OneToMany(() => Likes, (Likes) => Likes.user)
  likes: Likes[];
}
