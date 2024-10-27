import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDiagnosisDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
