import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Treatment } from './entities/treatment.entity';

@Resolver('treatment')
export class TreatmentResolver {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Mutation(() => Treatment)
  async createTreatment(
    @Args('createTreatment') createTreatmentDto: CreateTreatmentDto,
  ) {
    return this.treatmentService.create(createTreatmentDto);
  }

  @Query(() => [Treatment])
  async findAllTreatment() {
    return this.treatmentService.findAll();
  }

  @Query(() => Treatment)
  async findOneTreatment(@Args('id', { type: () => ID }) id: number) {
    return this.treatmentService.findOne(id);
  }

  @Mutation(() => Treatment)
  async updateTreatment(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateTreatment') updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return this.treatmentService.update(id, updateTreatmentDto);
  }

  @Mutation(() => ID)
  async removeTreatment(@Args('id', { type: () => ID }) id: number) {
    return this.treatmentService.remove(id);
  }
}
