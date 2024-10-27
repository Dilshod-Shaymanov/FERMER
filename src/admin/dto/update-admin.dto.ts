import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsBoolean, Length } from 'class-validator';

@InputType()
export class UpdateAdminDto {
  @Field({ nullable: true })
  @IsOptional()
  full_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  phone_number?: string;

  @Field({ nullable: true })
  @IsOptional()
  tg_link?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(6, 20)
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(6, 20)
  confirm_password?: string;

  @Field({ nullable: true })
  @IsOptional()
  hashed_refresh_token?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  is_creator?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;
}
