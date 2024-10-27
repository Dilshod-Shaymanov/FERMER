import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Worker } from '../../workers/entities/worker.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  role_name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => [Worker])
  @ManyToMany(() => Worker, (worker) => worker.roles)
  workers: Worker[];
}
