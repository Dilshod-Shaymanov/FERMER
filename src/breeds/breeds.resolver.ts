import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Breed } from './entities/breed.entity';

@Resolver('breeds')
export class BreedsResolver {
  constructor(private readonly breedsService: BreedsService) {}

  @Mutation(() => Breed)
  async create(@Args('createBreed') createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto);
  }

  @Query(() => [Breed])
  async findAll() {
    return this.breedsService.findAll();
  }

  @Query(() => Breed)
  async findOne(@Args('id', { type: () => ID }) id: number) {
    return this.breedsService.findOne(id);
  }

  @Mutation(() => Breed)
  async update(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateBreed') updateBreedDto: UpdateBreedDto,
  ) {
    return this.breedsService.update(id, updateBreedDto);
  }

  @Mutation(() => ID)
  async remove(@Args('id', { type: () => ID }) id: number) {
    return this.breedsService.remove(id);
  }
}
