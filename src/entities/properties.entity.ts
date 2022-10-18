import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";
import { ScheduleUsersProperties } from "./schedules_users_properties.entity";

@Entity("properties")
export class Property {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @OneToMany(
    () => ScheduleUsersProperties,
    (scheduleUsersProperties) => scheduleUsersProperties.property
  )
  property: ScheduleUsersProperties[];

  @ManyToOne(() => Category, (category) => category.properties, { eager: true })
  category: Category;
}
