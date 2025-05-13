import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MountainService } from './mountain.service';
import { CreateMountainDto } from './dto/create-mountain.dto';
import { UpdateMountainDto } from './dto/update-mountain.dto';

@Controller('mountains')
export class MountainController {
  constructor(private readonly mountainService: MountainService) {}

  @Post()
  create(@Body() createMountainDto: CreateMountainDto) {
    return this.mountainService.create(createMountainDto);
  }

  @Get()
  findAll() {
    return this.mountainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mountainService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMountainDto: UpdateMountainDto) {
    return this.mountainService.update(id, updateMountainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mountainService.remove(id);
  }
}
