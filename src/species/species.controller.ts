import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  async create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  async findAll() {
    return this.speciesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.speciesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateSpeciesDto: UpdateSpeciesDto) {
    return this.speciesService.update(id, updateSpeciesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.speciesService.remove(id);
  }
}
