import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { QueryCarDto } from './dto/query-car.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new car' })
  @ApiCreatedResponse({ description: 'Car created successfully' })
  create(@Body() dto: CreateCarDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List cars with pagination and optional filters' })
  @ApiOkResponse({ description: 'Paginated list of cars' })
  findAll(@Query() query: QueryCarDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a car by ID' })
  @ApiOkResponse({ description: 'Car found' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a car by ID' })
  @ApiOkResponse({ description: 'Car updated' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCarDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a car by ID' })
  @ApiOkResponse({ description: 'Car deleted' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
