import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Worker } from './entities/worker.entity';

@Resolver('workers')
export class WorkersResolver {
  constructor(private readonly workersService: WorkersService) {}

  @Mutation(() => Worker)
  async createWorker(@Args('createWorker') createWorkerDto: CreateWorkerDto) {
    return this.workersService.create(createWorkerDto);
  }

  @Query(() => [Worker])
  async findAllWorker() {
    return this.workersService.findAll();
  }

  @Query(() => Worker)
  async findOneWorker(@Args('id', { type: () => ID }) id: number) {
    return this.workersService.findOne(id);
  }

  @Mutation(() => Worker)
  async updateWorker(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateWorker') updateWorkerDto: UpdateWorkerDto,
  ) {
    return this.workersService.update(id, updateWorkerDto);
  }

  @Mutation(() => ID)
  async removeWorker(@Args('id', { type: () => ID }) id: number) {
    return this.workersService.remove(id);
  }
}
