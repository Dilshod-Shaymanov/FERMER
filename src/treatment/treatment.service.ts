import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Treatment } from './entities/treatment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TreatmentService {
  constructor(@InjectRepository(Treatment) private readonly treatmentRepo: Repository<Treatment>) {}

  async create(createTreatmentDto: CreateTreatmentDto): Promise<Treatment> {
    const treatment = this.treatmentRepo.create(createTreatmentDto);
    return await this.treatmentRepo.save(treatment);
  }

  async findAll(): Promise<Treatment[]> {
    return await this.treatmentRepo.find();
  }

  async findOne(id: number): Promise<Treatment> {
    const treatment = await this.treatmentRepo.findOne({where: {id}, relations: ['healths']})
    if (!treatment) {
      throw new NotFoundException(`Treatment with ID ${id} not found`);
    }
    return treatment;
  }

  async update(id: number, updateTreatmentDto: UpdateTreatmentDto): Promise<Treatment> {
    const treatment = await this.findOne(id);
    Object.assign(treatment, updateTreatmentDto);
    return await this.treatmentRepo.save(treatment);
  }

  async remove(id: number): Promise<void> {
    const treatment = await this.findOne(id)
    await this.treatmentRepo.remove(treatment);
  }
}
