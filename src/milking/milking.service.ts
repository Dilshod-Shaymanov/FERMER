import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMilkingDto } from './dto/create-milking.dto';
import { UpdateMilkingDto } from './dto/update-milking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Milking } from './entities/milking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MilkingService {
  constructor(
    @InjectRepository(Milking)
    private readonly milkingRepo: Repository<Milking>,
  ) {}

  async create(createMilkingDto: CreateMilkingDto): Promise<Milking> {
    const milking = this.milkingRepo.create(createMilkingDto);
    return await this.milkingRepo.save(milking);
  }

  async findAll(): Promise<Milking[]> {
    return await this.milkingRepo.find({ relations: ['milker'] });
  }

  async findOne(id: number): Promise<Milking> {
    const milking = await this.milkingRepo.findOne({
      where: { id },
      relations: ['milker'],
    });
    if (!milking) {
      throw new NotFoundException(`Milkin with ID ${id} not found`);
    }
    return milking;
  }

  async update(
    id: number,
    updateMilkingDto: UpdateMilkingDto,
  ): Promise<Milking> {
    const milking = await this.findOne(id);
    Object.assign(milking, updateMilkingDto);
    return await this.milkingRepo.save(milking);
  }

  async remove(id: number): Promise<void> {
    const milking = await this.findOne(id);
    await this.milkingRepo.remove(milking);
  }
}
