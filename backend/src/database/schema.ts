import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const cars = sqliteTable('cars', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  brand: text('brand').notNull(),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  licensePlate: text('license_plate').notNull().unique(),
  color: text('color').notNull(),
  price: real('price').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type Car = typeof cars.$inferSelect;
export type NewCar = typeof cars.$inferInsert;
