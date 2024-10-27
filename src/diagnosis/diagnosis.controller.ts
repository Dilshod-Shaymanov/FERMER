import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Post()
  async create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosisService.create(createDiagnosisDto);
  }

  @Get()
  async findAll() {
    return this.diagnosisService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.diagnosisService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateDiagnosisDto: UpdateDiagnosisDto) {
    return this.diagnosisService.update(id, updateDiagnosisDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.diagnosisService.remove(id);
  }
}
