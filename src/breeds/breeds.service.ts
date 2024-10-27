import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Species } from '../species/entities/species.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed) private readonly breedRepo: Repository<Breed>,
    @InjectRepository(Species)
    private readonly speciesRepo: Repository<Species>,
  ) {}

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    const species = await this.speciesRepo.findOne({
      where: { id: createBreedDto.species_id },
    });
    if (!species) {
      throw new NotFoundException(
        `Species with ID ${createBreedDto.species_id} not found`,
      );
    }

    const breed = this.breedRepo.create({
      ...createBreedDto,
      species,
    });

    return await this.breedRepo.save(breed);
  }

  async findAll(): Promise<Breed[]> {
    return await this.breedRepo.find({ relations: ['species'] });
  }

  async findOne(id: number): Promise<Breed> {
    const breed = await this.breedRepo.findOne({
      where: { id },
      relations: ['species'],
    });
    if (!breed) {
      throw new NotFoundException(`Breed with ID ${id} not found`);
    }
    return breed;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto): Promise<Breed> {
    const breed = await this.findOne(id);

    // Agar `speciesId` yangilanayotgan bo'lsa, species ni tekshirish
    if (updateBreedDto.species_id) {
      const species = await this.speciesRepo.findOne({
        where: { id: updateBreedDto.species_id },
      });
      if (!species) {
        throw new NotFoundException(
          `Species with ID ${updateBreedDto.species_id} not found`,
        );
      }
      breed.species = species; // Yangi speciesni bog'lash
    }

    Object.assign(breed, updateBreedDto);

    return await this.breedRepo.save(breed);
  }

  async remove(id: number): Promise<void> {
    const breed = await this.findOne(id);
    await this.breedRepo.remove(breed);
  }
}
