import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class CreateAnimalDto {
  @Field()
  tag_number: string;

  @IsNotEmpty()
  @IsInt()
  species_id: number;

  @IsNotEmpty()
  @IsInt()
  breed_id: number;

  @Field()
  birth_date: string;

  @Field()
  gender: string;

  @Field()
  weight: string;
}
