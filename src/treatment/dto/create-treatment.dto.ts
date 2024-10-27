import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTreatmentDto {
  @Field()
  treatment_method: string;

  @Field()
  drug_name: string;

  @Field()
  drug_dose: string;

  @Field()
  treatment_duration: string;
}
