import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Species } from '../../species/entities/species.entity';
import { Animal } from '../../animals/entities/animal.entity';

@ObjectType()
@Entity()
export class Breed {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field()
  @Column()
  species_id: number;

  @Field(() => Species)
  @ManyToOne(() => Species, (species) => species.breeds) // ManyToOne munosabati
  species: Species;

  @Field(() => [Animal])
  @OneToMany(() => Animal, (animal) => animal.breed, { eager: true })
  animals: Animal[];
}
