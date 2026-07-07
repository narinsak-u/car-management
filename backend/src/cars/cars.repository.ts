import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { eq, like, count, and, or, SQL } from 'drizzle-orm';
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
    const [car] = await this.db
      .insert(schema.cars)
      .values(dto as typeof schema.cars.$inferInsert)
      .returning();
    return car;
  }

  async findAll(query: QueryCarDto) {
    const conditions: SQL[] = [];

    if (query.manufacturer) {
      conditions.push(
        like(schema.cars.manufacturer, `%${query.manufacturer}%`),
      );
    }
    if (query.model) {
      conditions.push(like(schema.cars.model, `%${query.model}%`));
    }
    if (query.status) {
      conditions.push(
        eq(
          schema.cars.status,
          query.status as 'available' | 'maintenance' | 'in_transit',
        ),
      );
    }
    if (query.search) {
      const term = `%${query.search}%`;
      conditions.push(
        or(
          like(schema.cars.registrationNumber, term),
          like(schema.cars.manufacturer, term),
          like(schema.cars.model, term),
        ) as SQL,
      );
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const offset = ((query.page ?? 1) - 1) * (query.limit ?? 10);
    const limit = query.limit ?? 10;

    const dataPromise = this.db
      .select()
      .from(schema.cars)
      .where(where)
      .limit(limit)
      .offset(offset);

    const countQuery = this.db
      .select({ count: count(schema.cars.id) })
      .from(schema.cars);

    const [data, totalResult] = await Promise.all([
      dataPromise,
      where ? countQuery.where(where) : countQuery,
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
      .set({
        ...(dto as typeof schema.cars.$inferInsert),
        updatedAt: new Date().toISOString(),
      })
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
