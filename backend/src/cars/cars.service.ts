import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CarsRepository } from './cars.repository';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { QueryCarDto } from './dto/query-car.dto';

function isUniqueViolation(err: unknown): boolean {
  if (!(err instanceof Error)) return false;

  const cause = err.cause !== undefined ? JSON.stringify(err.cause) : '';
  const combined = [err.message, cause, JSON.stringify(err)]
    .join(' ')
    .toLowerCase();

  return (
    combined.includes('unique constraint') ||
    (combined.includes('unique') && combined.includes('failed')) ||
    combined.includes('sqlite_constraint_unique')
  );
}

@Injectable()
export class CarsService {
  constructor(private readonly repository: CarsRepository) {}

  async create(dto: CreateCarDto) {
    try {
      return await this.repository.create(dto);
    } catch (err) {
      if (isUniqueViolation(err)) {
        throw new ConflictException(
          `Car with registration number "${dto.registrationNumber}" already exists`,
        );
      }
      throw err;
    }
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
    try {
      const updated = await this.repository.update(id, dto);
      if (!updated) {
        throw new NotFoundException(`Car with id ${id} not found`);
      }
      return updated;
    } catch (err) {
      if (isUniqueViolation(err)) {
        throw new ConflictException(
          `Car with registration number "${dto.registrationNumber}" already exists`,
        );
      }
      throw err;
    }
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
