import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Health } from "../../health/entities/health.entity";

@ObjectType()
@Entity()
export class Treatment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  treatment_method: string;

  @Field()
  @Column({ length: 100 })
  drug_name: string;

  @Field()
  @Column({ length: 100 })
  drug_dose: string;

  @Field()
  @Column({ length: 100 })
  treatment_duration: string;

  @Field(() => [Health])
  @OneToMany(() => Health, (health) => health.treatment, { eager: true })
  healths: Health[];
}
