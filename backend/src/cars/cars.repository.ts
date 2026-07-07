import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { eq, like, count, and, SQL } from 'drizzle-orm';
import * as schema from '../database/schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { QueryCarDto } from './dto/query-car.dto';

@Injectable()
export class CarsRepository {
  constructor(
    @Inject('DRIZZLE') private readonly db: LibSQLDatabase<typeof schema>,
  ) {}

  async create(dto: CreateCarDto) {
    const [car] = await this.db.insert(schema.cars).values(dto).returning();
    return car;
  }

  async findAll(query: QueryCarDto) {
    const conditions: SQL[] = [];

    if (query.brand) {
      conditions.push(like(schema.cars.brand, `%${query.brand}%`));
    }
    if (query.model) {
      conditions.push(like(schema.cars.model, `%${query.model}%`));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const offset = ((query.page ?? 1) - 1) * (query.limit ?? 10);
    const limit = query.limit ?? 10;

    const [data, totalResult] = await Promise.all([
      this.db
        .select()
        .from(schema.cars)
        .where(where)
        .limit(limit)
        .offset(offset),
      this.db.select({ count: count() }).from(schema.cars).where(where),
    ]);

    const total = totalResult[0]?.count ?? 0;

    return {
      data,
      meta: {
        total,
        page: query.page ?? 1,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: number) {
    const [car] = await this.db
      .select()
      .from(schema.cars)
      .where(eq(schema.cars.id, id))
      .limit(1);
    return car ?? null;
  }

  async update(id: number, dto: UpdateCarDto) {
    const [car] = await this.db
      .update(schema.cars)
      .set({ ...dto, updatedAt: new Date().toISOString() })
      .where(eq(schema.cars.id, id))
      .returning();
    return car ?? null;
  }

  async delete(id: number) {
    const [car] = await this.db
      .delete(schema.cars)
      .where(eq(schema.cars.id, id))
      .returning();
    return car ?? null;
  }
}
