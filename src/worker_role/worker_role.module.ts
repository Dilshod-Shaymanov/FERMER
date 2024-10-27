import { Module } from '@nestjs/common';
import { WorkerRoleService } from './worker_role.service';
import { WorkerRoleController } from './worker_role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerRole } from './entities/worker_role.entity';
import { Worker } from '../workers/entities/worker.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerRole, Worker, Role])],
  controllers: [WorkerRoleController],
  providers: [WorkerRoleService],
  exports: [WorkerRoleService],
})
export class WorkerRoleModule {}
