import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateHealthDto {
  @Field({ nullable: true })
  animal_id?: number;

  @Field({ nullable: true })
  diagnosis_id?: number;

  @Field({ nullable: true })
  diagnosis_date?: string;

  @Field({ nullable: true })
  worker_id?: number;

  @Field({ nullable: true })
  treatment_id?: number;

  @Field({ nullable: true })
  description?: string;
}
