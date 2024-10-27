import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkerDto {
  @Field({ nullable: true })
  full_name?: string;

  @Field({ nullable: true })
  birth_date?: string;

  @Field({ nullable: true })
  experience?: number;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone_number?: string;

  @Field({ nullable: true })
  tg_link?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  is_active?: boolean;

  @Field({ nullable: true })
  description?: string;
}
