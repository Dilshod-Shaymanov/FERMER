import { HealthService } from './health.service';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Health } from './entities/health.entity';

@Resolver('health')
export class HealthResolver {
  constructor(private readonly healthService: HealthService) {}

  @Mutation(() => Health)
  async createHealth(@Args('createHeath') createHealthDto: CreateHealthDto) {
    return this.healthService.create(createHealthDto);
  }

  @Query(() => [Health])
  async findAllHealth() {
    return this.healthService.findAll();
  }

  @Query(() => Health)
  async findOneHealth(@Args('id', { type: () => ID }) id: number) {
    return this.healthService.findOne(id);
  }

  @Mutation(() => Health)
  async updateHealth(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateHealth') updateHealthDto: UpdateHealthDto,
  ) {
    return this.healthService.update(id, updateHealthDto);
  }

  @Mutation(() => ID)
  async removeHealth(@Args('id', { type: () => ID }) id: number) {
    return this.healthService.remove(id);
  }
}
