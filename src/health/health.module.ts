import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Health } from './entities/health.entity';
import { Animal } from '../animals/entities/animal.entity';
import { Diagnosis } from '../diagnosis/entities/diagnosis.entity';
import { Worker } from '../workers/entities/worker.entity';
import { Treatment } from '../treatment/entities/treatment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Health, Animal, Diagnosis, Worker, Treatment])],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
