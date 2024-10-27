import { Module } from '@nestjs/common';
import { MilkingService } from './milking.service';
import { MilkingController } from './milking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Milking } from './entities/milking.entity';
import { Worker } from '../workers/entities/worker.entity';
import { MilkingResolver } from './milking.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Milking, Worker])],
  controllers: [MilkingController],
  providers: [MilkingService, MilkingResolver],
  exports: [MilkingService]
})
export class MilkingModule {}
