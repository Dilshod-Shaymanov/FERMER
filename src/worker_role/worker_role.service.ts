import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkerRole } from './entities/worker_role.entity';
import { CreateWorkerRoleDto } from './dto/create-worker_role.dto';
import { UpdateWorkerRoleDto } from './dto/update-worker_role.dto';


@Injectable()
export class WorkerRoleService {
  constructor(
    @InjectRepository(WorkerRole)
    private readonly workerRoleRepo: Repository<WorkerRole>,
  ) {}

  async create(createWorkerRoleDto: CreateWorkerRoleDto): Promise<WorkerRole> {
    const workerRole = this.workerRoleRepo.create(createWorkerRoleDto);
    return await this.workerRoleRepo.save(workerRole);
  }

  async findAll(): Promise<WorkerRole[]> {
    return await this.workerRoleRepo.find({
      relations: ['worker', 'role'],
    });
  }

  async findOne(id: number): Promise<WorkerRole> {
    const workerRole = await this.workerRoleRepo.findOne({
      where: { id },
      relations: ['worker', 'role'],
    });
    if (!workerRole) {
      throw new NotFoundException(`WorkerRole with ID ${id} not found`);
    }
    return workerRole;
  }

  async update(id: number, updateWorkerRoleDto: UpdateWorkerRoleDto): Promise<WorkerRole> {
    const workerRole = await this.findOne(id);
    Object.assign(workerRole, updateWorkerRoleDto);
    return await this.workerRoleRepo.save(workerRole);
  }

  async remove(id: number): Promise<void> {
    const workerRole = await this.findOne(id);
    await this.workerRoleRepo.remove(workerRole);
  }
}
