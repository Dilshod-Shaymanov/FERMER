import { ParseIntPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from './entities/role.entity';

@Resolver('roles')
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  async createRole(@Args('createRole') createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Query(() => [Role])
  async findAllRole() {
    return this.rolesService.findAll();
  }

  @Query(() => Role)
  async findOneRole(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  async updateRole(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateRole') updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Mutation(() => ID)
  async removeRole(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
