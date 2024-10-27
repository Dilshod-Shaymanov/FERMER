import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDiagnosisDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}
