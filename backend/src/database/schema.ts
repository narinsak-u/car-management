import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const cars = sqliteTable('cars', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  manufacturer: text('manufacturer').notNull(),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  registrationNumber: text('registration_number').notNull().unique(),
  color: text('color').notNull(),
  status: text('status', { enum: ['available', 'maintenance', 'in_transit'] })
    .notNull()
    .default('available'),
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export type Car = typeof cars.$inferSelect;
export type NewCar = typeof cars.$inferInsert;
