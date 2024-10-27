import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@Controller('treatment')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Post()
  async create(@Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentService.create(createTreatmentDto);
  }

  @Get()
  async findAll() {
    return this.treatmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.treatmentService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTreatmentDto: UpdateTreatmentDto) {
    return this.treatmentService.update(id, updateTreatmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.treatmentService.remove(id);
  }
}
