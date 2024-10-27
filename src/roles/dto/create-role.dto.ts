import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, Length } from 'class-validator';

@InputType()
export class CreateRoleDto {
  @IsString()
  @Length(1, 100)
  @Field()
  role_name: string;

  @IsOptional()
  @IsString()
  @Field()
  description: string;
}
