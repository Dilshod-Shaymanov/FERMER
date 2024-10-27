import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTreatmentDto {
  @Field({nullable: true})
  treatment_method?: string;

  @Field({nullable: true})
  drug_name?: string;

  @Field({nullable: true})
  drug_dose?: string;

  @Field({nullable: true})
  treatment_duration?: string;
}
