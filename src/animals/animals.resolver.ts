import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Animal } from './entities/animal.entity';

@Resolver('animals')
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService) {}

  @Mutation(() => Animal)
  async createAnimal(@Args('createAnimal') createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Query(() => [Animal])
  async findAllAnimal() {
    return this.animalsService.findAll();
  }

  @Query(() => Animal)
  async findOneAnimal(@Args('id', { type: () => ID }) id: number) {
    return this.animalsService.findOne(id);
  }

  @Mutation(() => Animal)
  async updateAnimal(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateAnimal') updateAnimalDto: UpdateAnimalDto,
  ) {
    return this.animalsService.update(id, updateAnimalDto);
  }

  @Mutation(() => ID)
  async removeAnimal(@Args('id', { type: () => ID }) id: number) {
    return this.animalsService.remove(id);
  }
}
