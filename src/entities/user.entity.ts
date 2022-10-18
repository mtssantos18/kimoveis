import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ScheduleUsersProperties } from "./schedules_users_properties.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => ScheduleUsersProperties,
    (scheduleUsersProperties) => scheduleUsersProperties.user
  )
  user: ScheduleUsersProperties[];
}
