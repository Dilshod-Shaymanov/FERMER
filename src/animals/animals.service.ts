import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { Species } from '../species/entities/species.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal) private readonly animalRepo: Repository<Animal>,
    @InjectRepository(Species)
    private readonly speciesRepo: Repository<Species>,
    @InjectRepository(Breed) private readonly breedRepo: Repository<Breed>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const species = await this.speciesRepo.findOne({
      where: { id: createAnimalDto.species_id },
    });
    if (!species) {
      throw new NotFoundException(
        `Species with ID ${createAnimalDto.species_id} not found`,
      );
    }

    const breed = await this.breedRepo.findOne({
      where: { id: createAnimalDto.breed_id },
    });
    if (!breed) {
      throw new NotFoundException(
        `Breed with ID ${createAnimalDto.breed_id} not found`,
      );
    }

    const animal = this.animalRepo.create({
      ...createAnimalDto,
      species,
      breed,
    });
    return await this.animalRepo.save(animal);
  }

  async findAll(): Promise<Animal[]> {
    return await this.animalRepo.find({ relations: ['species', 'breed'] });
  }

  async findOne(id: number): Promise<Animal> {
    const animal = await this.animalRepo.findOne({
      where: { id },
      relations: ['species', 'breed'],
    });
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    return animal;
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    const animal = await this.findOne(id);

    if (updateAnimalDto.species_id) {
      const species = await this.speciesRepo.findOne({
        where: { id: updateAnimalDto.species_id },
      });
      if (!species) {
        throw new NotFoundException(
          `Species with ID ${updateAnimalDto.species_id} not found`,
        );
      }
      animal.species = species;
    }

    if (updateAnimalDto.breed_id) {
      const breed = await this.breedRepo.findOne({
        where: { id: updateAnimalDto.breed_id },
      });
      if (!breed) {
        throw new NotFoundException(
          `Breed with ID ${updateAnimalDto.breed_id} not found`,
        );
      }
      animal.breed = breed;
    }

    Object.assign(animal, {
      teg_number: updateAnimalDto.tag_number,
      birth_date: updateAnimalDto.birth_date,
      gender: updateAnimalDto.gender,
      weight: updateAnimalDto.weight,
    });

    return await this.animalRepo.save(animal);
  }

  async remove(id: number): Promise<void> {
    const animal = await this.findOne(id);
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    await this.animalRepo.remove(animal);
  }
}
