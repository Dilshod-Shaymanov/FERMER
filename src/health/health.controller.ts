import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post()
  async create(@Body() createHealthDto: CreateHealthDto) {
    return this.healthService.create(createHealthDto);
  }

  @Get()
  async findAll() {
    return this.healthService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.healthService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateHealthDto: UpdateHealthDto) {
    return this.healthService.update(id, updateHealthDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.healthService.remove(id);
  }
}
