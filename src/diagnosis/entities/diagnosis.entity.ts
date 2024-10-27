import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Health } from "../../health/entities/health.entity";

@ObjectType()
@Entity()
export class Diagnosis {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => [Health])
  @OneToMany(() => Health, (health) => health.diagnosis, { eager: true })
  healths: Health[];
}
