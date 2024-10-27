import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MilkingService } from './milking.service';
import { CreateMilkingDto } from './dto/create-milking.dto';
import { UpdateMilkingDto } from './dto/update-milking.dto';

@Controller('milking')
export class MilkingController {
  constructor(private readonly milkingService: MilkingService) {}

  @Post()
  async create(@Body() createMilkingDto: CreateMilkingDto) {
    return this.milkingService.create(createMilkingDto);
  }

  @Get()
  async findAll() {
    return this.milkingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.milkingService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMilkingDto: UpdateMilkingDto) {
    return this.milkingService.update(id, updateMilkingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.milkingService.remove(id);
  }
}
