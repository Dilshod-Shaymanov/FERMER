import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Admin } from './entities/admin.entity';

@Resolver('admin')
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => Admin)
  async createAdmin(@Args('createAdmin') createAdminDto: CreateAdminDto) {
    return await this.adminService.create(createAdminDto);
  }

  @Query(() => [Admin])
  async findAllAdmin() {
    return await this.adminService.findAll();
  }

  @Query(() => Admin)
  async findOneAdmin(@Args('id', { type: () => ID }) id: number) {
    return await this.adminService.findOne(id);
  }

  @Mutation(() => Admin)
  async updateAdmin(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateAdmin') updateAdminDto: UpdateAdminDto,
  ) {
    return await this.adminService.update(id, updateAdminDto);
  }

  @Mutation(() => ID)
  async removeAdmin(@Args('id', { type: () => ID }) id: number) {
    return await this.adminService.remove(id);
  }
}
