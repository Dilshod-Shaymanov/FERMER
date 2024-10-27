import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesResolver } from './roles.resolver';
import { Worker } from '../workers/entities/worker.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Role, Worker])],
  providers: [RolesService, RolesResolver],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
