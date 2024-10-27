import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Admin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  full_name: string;

  @Field()
  @Column({ unique: true, length: 150 })
  email: string;

  @Field({ nullable: true })
  @Column({ length: 20, nullable: true })
  phone_number?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tg_link?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hashed_password?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hashed_refresh_token?: string;

  @Field({ nullable: true })
  @Column({ default: true })
  is_active?: boolean;

  @Field({ nullable: true }) 
  @Column({ default: false })
  is_creator?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;
}
