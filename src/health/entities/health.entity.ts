import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "../../animals/entities/animal.entity";
import { Diagnosis } from "../../diagnosis/entities/diagnosis.entity";
import { Worker } from "../../workers/entities/worker.entity";
import { Treatment } from "../../treatment/entities/treatment.entity";

@ObjectType()
@Entity()
export class Health {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  animal_id: number;

  @Field(() => Animal)
  @ManyToOne(() => Animal, (animal) => animal.healths) // ManyToOne munosabati
  animal: Animal;

  @Field()
  @Column()
  diagnosis_id: number;

  @Field(() => Diagnosis)
  @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.healths) // ManyToOne munosabati
  diagnosis: Diagnosis;

  @Field()
  @Column()
  diagnosis_date: string;

  @Field()
  @Column()
  worker_id: number;

  @Field(() => Worker)
  @ManyToOne(() => Worker, (worker) => worker.healths) // ManyToOne munosabati
  worker: Worker;

  @Field()
  @Column()
  treatment_id: number;

  @Field(() => Treatment)
  @ManyToOne(() => Treatment, (treatment) => treatment.healths) // ManyToOne munosabati
  treatment: Treatment;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;
}
