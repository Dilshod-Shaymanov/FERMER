import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Diagnosis } from './entities/diagnosis.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(Diagnosis)
    private readonly diagnosisRepo: Repository<Diagnosis>,
  ) {}

  async create(createDiagnosisDto: CreateDiagnosisDto): Promise<Diagnosis> {
    const diagnosis = this.diagnosisRepo.create(createDiagnosisDto);
    return await this.diagnosisRepo.save(diagnosis);
  }

  async findAll(): Promise<Diagnosis[]> {
    return await this.diagnosisRepo.find({ relations: ['healths'] });
  }

  async findOne(id: number): Promise<Diagnosis> {
    const diagnosis = await this.diagnosisRepo.findOne({
      where: { id },
      relations: ['heath'],
    });
    if (!diagnosis) {
      throw new NotFoundException(`Diagnosis with ID ${id} not found`);
    }
    return diagnosis;
  }

  async update(
    id: number,
    updateDiagnosisDto: UpdateDiagnosisDto,
  ): Promise<Diagnosis> {
    const diagnosis = await this.findOne(id);
    Object.assign(diagnosis, updateDiagnosisDto);
    return await this.diagnosisRepo.save(diagnosis);
  }

  async remove(id: number): Promise<any> {
    const diagnosis = await this.findOne(id);
    await this.diagnosisRepo.remove(diagnosis);
  }
}
