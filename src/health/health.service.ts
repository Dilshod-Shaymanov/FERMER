import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Health } from './entities/health.entity';
import { Repository } from 'typeorm';
import { Animal } from '../animals/entities/animal.entity';
import { Diagnosis } from '../diagnosis/entities/diagnosis.entity';
import { Worker } from '../workers/entities/worker.entity';
import { Treatment } from '../treatment/entities/treatment.entity';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Health) private readonly healthRepo: Repository<Health>,
    @InjectRepository(Animal) private readonly animalRepo: Repository<Animal>,
    @InjectRepository(Diagnosis)
    private readonly diagnosisRepo: Repository<Diagnosis>,
    @InjectRepository(Worker) private readonly workerRepo: Repository<Worker>,
    @InjectRepository(Treatment)
    private readonly treatmentRepo: Repository<Treatment>,
  ) {}

  async create(createHealthDto: CreateHealthDto): Promise<Health> {
    const animal = await this.animalRepo.findOne({
      where: { id: createHealthDto.animal_id },
    });
    if (!animal) {
      throw new NotFoundException(
        `Animal with ID ${createHealthDto.animal_id} not found`,
      );
    }
    const diagnosis = await this.diagnosisRepo.findOne({
      where: { id: createHealthDto.diagnosis_id },
    });
    if (!diagnosis) {
      throw new NotFoundException(
        `Diagnosis with ID ${createHealthDto.diagnosis_id} not found`,
      );
    }
    const worker = await this.workerRepo.findOne({
      where: { id: createHealthDto.worker_id },
    });
    if (!worker) {
      throw new NotFoundException(
        `Worker with ID ${createHealthDto.worker_id} not found`,
      );
    }
    const treatment = await this.treatmentRepo.findOne({
      where: { id: createHealthDto.treatment_id },
    });
    if (!treatment) {
      throw new NotFoundException(
        `Treatment with ID ${createHealthDto.treatment_id} not found`,
      );
    }

    const health = this.healthRepo.create({
      ...createHealthDto,
      animal,
      diagnosis,
      worker,
      treatment,
    });
    return await this.healthRepo.save(health);
  }

  async findAll(): Promise<Health[]> {
    return await this.healthRepo.find({
      relations: ['animal', 'diagnosis', 'worker', 'treatment'],
    });
  }

  async findOne(id: number): Promise<Health> {
    const health = await this.healthRepo.findOne({
      where: { id },
      relations: ['animal', 'diagnosis', 'worker', 'treatment'],
    });
    if (!health) {
      throw new NotFoundException(`Health with ID ${id} not found`);
    }
    return health;
  }

  async update(id: number, updateHealthDto: UpdateHealthDto): Promise<Health> {
    const health = await this.findOne(id);

    if (updateHealthDto.animal_id) {
      const animal = await this.animalRepo.findOne({
        where: { id: updateHealthDto.animal_id },
      });
      if (!animal) {
        throw new NotFoundException(
          `Animal with ID ${updateHealthDto.animal_id} not found`,
        );
      }
      health.animal = animal;
    }
    if (updateHealthDto.diagnosis_id) {
      const diagnosis = await this.diagnosisRepo.findOne({
        where: { id: updateHealthDto.diagnosis_id },
      });
      if (!diagnosis) {
        throw new NotFoundException(
          `Diagnosis with ID ${updateHealthDto.diagnosis_id} not found`,
        );
      }
      health.diagnosis = diagnosis;
    }

    if (updateHealthDto.worker_id) {
      const worker = await this.workerRepo.findOne({
        where: { id: updateHealthDto.worker_id },
      });
      if (!worker) {
        throw new NotFoundException(
          `Worker with ID ${updateHealthDto.worker_id} not found`,
        );
      }
      health.worker = worker;
    }
    if (updateHealthDto.treatment_id) {
      const treatment = await this.treatmentRepo.findOne({
        where: { id: updateHealthDto.treatment_id },
      });
      if (!treatment) {
        throw new NotFoundException(
          `Treatment with ID ${updateHealthDto.treatment_id} not found`,
        );
      }
      health.treatment = treatment;
    }

    Object.assign(health, {
      diagnosis_date: updateHealthDto.diagnosis_date,
      description: updateHealthDto.description,
    });

    return await this.healthRepo.save(health);
  }

  async remove(id: number): Promise<any> {
    const health = await this.findOne(id);
    if (!health) {
      throw new NotFoundException(`Health with ID ${id} not found`);
    }
    await this.healthRepo.remove(health);
  }
}
