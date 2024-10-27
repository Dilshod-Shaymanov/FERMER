import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateAnimalDto {
  @Field({ nullable: true })
  tag_number?: string;

  @IsNotEmpty()
  @IsInt()
  species_id?: number;

  @IsNotEmpty()
  @IsInt()
  breed_id?: number;

  @Field({nullable: true})
  birth_date?: string;

  @Field({nullable: true})
  gender?: string;

  @Field({nullable: true})
  weight?: string;
}
