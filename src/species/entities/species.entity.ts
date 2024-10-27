import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Breed } from '../../breeds/entities/breed.entity';
import { Animal } from '../../animals/entities/animal.entity';

@ObjectType()
@Entity()
export class Species {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  // OneToMany munosabati, breeds asosan bir turga (species) tegishli bo'ladi
  @Field(() => [Breed])
  @OneToMany(() => Breed, (breed) => breed.species, { eager: true })
  breeds: Breed[];

  @Field(() => [Animal])
  @OneToMany(() => Animal, (animal) => animal.breed, { eager: true })
  animals: Animal[];
}
