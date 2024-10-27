import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Worker } from './entities/worker.entity';
import { WorkersResolver } from './workers.resolver';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Worker, Role])],
  controllers: [WorkersController],
  providers: [WorkersService, WorkersResolver],
  exports: [WorkersService],
})
export class WorkersModule {}
