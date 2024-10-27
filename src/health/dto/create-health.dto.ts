import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateHealthDto {
  @Field()
  animal_id: number;

  @Field()
  diagnosis_id: number;

  @Field()
  diagnosis_date: string;

  @Field()
  worker_id: number;

  @Field()
  treatment_id: number;

  @Field({ nullable: true })
  description?: string;
}
