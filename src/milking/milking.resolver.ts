import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MilkingService } from './milking.service';
import { CreateMilkingDto } from './dto/create-milking.dto';
import { UpdateMilkingDto } from './dto/update-milking.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Milking } from './entities/milking.entity';

@Resolver('milking')
export class MilkingResolver {
  constructor(private readonly milkingService: MilkingService) {}

  @Mutation(() => Milking)
  async createMilking(@Args('createMilking') createMilkingDto: CreateMilkingDto) {
    return this.milkingService.create(createMilkingDto);
  }

  @Query(() => [Milking])
  async findAllMilking() {
    return this.milkingService.findAll();
  }

  @Query(() => Milking)
  async findOneMilking(@Args('id', { type: () => ID }) id: number) {
    return this.milkingService.findOne(id);
  }

  @Mutation(() => Milking)
  async updateMilking(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateMilking') updateMilkingDto: UpdateMilkingDto,
  ) {
    return this.milkingService.update(id, updateMilkingDto);
  }

  @Mutation(() => ID)
  async removeMilking(@Args('id', { type: () => ID }) id: number) {
    return this.milkingService.remove(id);
  }
}
