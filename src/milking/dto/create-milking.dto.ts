import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMilkingDto {
  @Field()
  animal_id: number;

  @Field()
  milk_quentity: string;

  @Field()
  milking_date: string;

  @Field()
  milker_id: number;
}
