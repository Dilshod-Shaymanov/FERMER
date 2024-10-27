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
import { WorkerRoleService } from './worker_role.service';
import { CreateWorkerRoleDto } from './dto/create-worker_role.dto';
import { UpdateWorkerRoleDto } from './dto/update-worker_role.dto';

@Controller('worker-role')
export class WorkerRoleController {
  constructor(private readonly workerRoleService: WorkerRoleService) {}

  @Post()
  async create(@Body() createWorkerRoleDto: CreateWorkerRoleDto) {
    return this.workerRoleService.create(createWorkerRoleDto);
  }

  @Get()
  async findAll() {
    return this.workerRoleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workerRoleService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkerRoleDto: UpdateWorkerRoleDto,
  ) {
    return this.workerRoleService.update(id, updateWorkerRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.workerRoleService.remove(id);
  }
}
