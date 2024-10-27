import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateMilkingDto {
  @Field({ nullable: true })
  animal_id?: number;

  @Field({ nullable: true })
  milk_quentity?: string;

  @Field({ nullable: true })
  milking_date?: string;

  @Field({ nullable: true })
  milker_id?: number;
}
