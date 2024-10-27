import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepo: Repository<Species>,
  ) {}

  async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    const species = this.speciesRepo.create(createSpeciesDto);
    return await this.speciesRepo.save(species);
  }

  async findAll(): Promise<Species[]> {
    return await this.speciesRepo.find({ relations: ['breeds'] });
  }

  async findOne(id: number): Promise<Species> {
    const species = await this.speciesRepo.findOne({
      where: { id },
      relations: ['breeds'],
    });
    if (!species) {
      throw new NotFoundException(`Species with ID ${id} not found`);
    }
    return species;
  }

  async update(
    id: number,
    updateSpeciesDto: UpdateSpeciesDto,
  ): Promise<Species> {
    const species = await this.findOne(id);
    Object.assign(species, updateSpeciesDto);
    return await this.speciesRepo.save(species);
  }

  async remove(id: number): Promise<void> {
    const species = await this.findOne(id);
    await this.speciesRepo.remove(species);
  }
}
