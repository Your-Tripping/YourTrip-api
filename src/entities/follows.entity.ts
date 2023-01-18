import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity("follows")
export class Follows {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  followedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.follows)
  follower: User;

  @ManyToOne(() => User, (user) => user.following)
  following: User;
}
