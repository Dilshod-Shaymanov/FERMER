import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, Length } from 'class-validator';

@InputType()
export class UpdateRoleDto {
  @IsString()
  @Length(1, 100)
  @Field({ nullable: true })
  role_name?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;
}
