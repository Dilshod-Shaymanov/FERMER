import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { Animal } from './animal.entity'; // Animal jadvali
import { Worker } from '../../workers/entities/worker.entity'; // Worker jadvali

@ObjectType()
@Entity()
export class Milking {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

//   // `Animal` jadvallariga bog'lanish
//   @Field(() => Animal)
//   @ManyToOne((type) => Animal, (animal) => animal.milkings)
//   @JoinColumn({ name: 'animal_id' })
//   animal: Animal;

  @Field(() => String)
  @Column({ type: 'varchar', length: 50 })
  milk_quantity: string;

  @Field(() => String)
  @Column({ type: 'date' })
  milking_date: string;

  // `Worker` jadvallariga bog'lanish
  @Field(() => Worker)
  @ManyToOne((type) => Worker, (worker) => worker.milkings)
  @JoinColumn({ name: 'milker_id' })
  worker: Worker;
}
