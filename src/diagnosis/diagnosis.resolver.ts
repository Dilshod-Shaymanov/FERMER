import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Diagnosis } from './entities/diagnosis.entity';

@Resolver('diagnosis')
export class DiagnosisResolver {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Mutation(() => Diagnosis)
  async createDiagnosis(
    @Args('createDiagnosis') createDiagnosisDto: CreateDiagnosisDto,
  ) {
    return this.diagnosisService.create(createDiagnosisDto);
  }

  @Query(() => [Diagnosis])
  async findAllDiagnosis() {
    return this.diagnosisService.findAll();
  }

  @Query(() => Diagnosis)
  async findOneDiagnosis(@Args('id', { type: () => ID }) id: number) {
    return this.diagnosisService.findOne(id);
  }

  @Mutation(() => Diagnosis)
  async updateDiagnosis(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateDiagnosis') updateDiagnosisDto: UpdateDiagnosisDto,
  ) {
    return this.diagnosisService.update(id, updateDiagnosisDto);
  }

  @Mutation(() => ID)
  async removeDiagnosis(@Args('id', { type: () => ID }) id: number) {
    return this.diagnosisService.remove(id);
  }
}
