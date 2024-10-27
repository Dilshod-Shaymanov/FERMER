import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBreedDto {
  @Field()
  name: string;

  @Field()
  description: string;

  @IsNotEmpty()
  @IsInt()
  species_id: number;
}
