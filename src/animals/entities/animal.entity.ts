import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Species } from "../../species/entities/species.entity";
import { Breed } from "../../breeds/entities/breed.entity";
import { Health } from "../../health/entities/health.entity";

@ObjectType()
@Entity()
export class Animal {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  tag_number: string;

  @Field()
  @Column()
  species_id: number;

  @Field(() => Species)
  @ManyToOne(() => Species, (species) => species.breeds) // ManyToOne munosabati
  species: Species;

  @Field()
  @Column()
  breed_id: number;

  @Field(() => Breed)
  @ManyToOne(() => Breed, (breed) => breed.animals) // ManyToOne munosabati
  breed: Breed;

  @Field()
  @Column()
  birth_date: string;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  weight: string;

  @Field(() => [Health])
  @OneToMany(() => Health, (health) => health.animal, { eager: true })
  healths: Health[];
}
