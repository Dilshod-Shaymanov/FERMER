import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSpeciesDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
