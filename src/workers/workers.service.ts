import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkersService {
  constructor(
    @InjectRepository(Worker) private readonly workerRepo: Repository<Worker>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto): Promise<Worker> {
    const worker = this.workerRepo.create(createWorkerDto);
    return await this.workerRepo.save(worker);
  }

  async findAll(): Promise<Worker[]> {
    return await this.workerRepo.find({
      relations: ['roles'],
    });
  }

  async findOne(id: number): Promise<Worker> {
    const worker = await this.workerRepo.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!worker) {
      throw new NotFoundException(`Worker with ID ${id} not found`);
    }
    return worker;
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto): Promise<Worker> {
    const worker = await this.findOne(id);
    Object.assign(worker, updateWorkerDto);
    return await this.workerRepo.save(worker);
  }

  async remove(id: number): Promise<void> {
    const worker = await this.findOne(id);
    await this.workerRepo.remove(worker);
  }
}
