import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Species } from './entities/species.entity';

@Resolver('species')
export class SpeciesResolver {
  constructor(private readonly speciesService: SpeciesService) {}

  @Mutation(() => Species)
  async createSpecies(
    @Args('createSpecies') createSpeciesDto: CreateSpeciesDto,
  ) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Query(() => [Species])
  async findAllSpecies() {
    return this.speciesService.findAll();
  }

  @Query(() => Species)
  async findOneSpecies(@Args('id', { type: () => ID }) id: number) {
    return this.speciesService.findOne(id);
  }

  @Mutation(() => Species)
  async updateSpecies(
    @Args('id') id: number,
    @Args('updateSpecies', { type: () => ID })
    updateSpeciesDto: UpdateSpeciesDto,
  ) {
    return this.speciesService.update(id, updateSpeciesDto);
  }

  @Mutation(() => ID)
  async removeSpecies(@Args('id', { type: () => ID }) id: number) {
    return this.speciesService.remove(id);
  }
}
