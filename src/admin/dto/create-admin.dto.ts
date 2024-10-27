import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsBoolean, Length } from 'class-validator';

@InputType()
export class CreateAdminDto {
  @Field()
  full_name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  phone_number?: string;

  @Field({ nullable: true })
  @IsOptional()
  tg_link?: string;

  @Field()
  @Length(6, 20)
  password: string;

  @Field()
  @Length(6, 20)
  confirm_password: string;

  @Field({ nullable: true, defaultValue: true })
  @IsBoolean()
  is_active?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsBoolean()
  is_creator?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;
}
