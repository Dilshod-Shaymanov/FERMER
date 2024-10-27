import { IsNumber } from "class-validator";

export class CreateWorkerRoleDto {
  @IsNumber()
  worker_id: number;

  @IsNumber()
  role_id: number;
}
