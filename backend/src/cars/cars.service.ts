import { Injectable, NotFoundException } from '@nestjs/common';
import { CarsRepository } from './cars.repository';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { QueryCarDto } from './dto/query-car.dto';

@Injectable()
export class CarsService {
  constructor(private readonly repository: CarsRepository) {}

  async create(dto: CreateCarDto) {
    return this.repository.create(dto);
  }

  async findAll(query: QueryCarDto) {
    return this.repository.findAll(query);
  }

  async findById(id: number) {
    const car = await this.repository.findById(id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  async update(id: number, dto: UpdateCarDto) {
    await this.findById(id);
    const updated = await this.repository.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return updated;
  }

  async delete(id: number) {
    await this.findById(id);
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return deleted;
  }
}
