import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWorkerDto {
  @Field()
  full_name: string;

  @Field()
  birth_date: string;

  @Field()
  experience: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone_number?: string;

  @Field({ nullable: true })
  tg_link?: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  is_active?: boolean;

  @Field({ nullable: true })
  description?: string;
}
