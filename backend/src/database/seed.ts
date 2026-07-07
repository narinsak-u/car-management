import { count } from 'drizzle-orm';
import { db } from './db';
import { cars } from './schema';

const seedData = [
  {
    manufacturer: 'Mercedes-Benz',
    model: 'Sprinter 314 CDI',
    year: 2023,
    registrationNumber: 'ABC-1234',
    color: 'White',
    status: 'available' as const,
    notes: 'Recently serviced',
  },
  {
    manufacturer: 'Ford',
    model: 'Transit Custom',
    year: 2022,
    registrationNumber: 'XYZ-9876',
    color: 'Blue',
    status: 'maintenance' as const,
    notes: 'Brake inspection needed',
  },
  {
    manufacturer: 'Volkswagen',
    model: 'Crafter Panel Van',
    year: 2024,
    registrationNumber: 'FLT-5512',
    color: 'Silver',
    status: 'in_transit' as const,
  },
  {
    manufacturer: 'Iveco',
    model: 'Daily 35S14',
    year: 2021,
    registrationNumber: 'TRK-4422',
    color: 'Red',
    status: 'available' as const,
  },
  {
    manufacturer: 'Toyota',
    model: 'Proace Electric',
    year: 2024,
    registrationNumber: 'VAN-0099',
    color: 'Green',
    status: 'available' as const,
    notes: 'Electric vehicle',
  },
  {
    manufacturer: 'MAN',
    model: 'TGE 3.140',
    year: 2023,
    registrationNumber: 'BUS-7788',
    color: 'Yellow',
    status: 'maintenance' as const,
    notes: 'Oil change due',
  },
  {
    manufacturer: 'Renault',
    model: 'Master Z.E.',
    year: 2024,
    registrationNumber: 'CAB-3321',
    color: 'Black',
    status: 'available' as const,
  },
  {
    manufacturer: 'Fiat',
    model: 'Ducato',
    year: 2022,
    registrationNumber: 'LOR-9900',
    color: 'Orange',
    status: 'in_transit' as const,
    notes: 'Delivering to warehouse',
  },
  {
    manufacturer: 'Peugeot',
    model: 'Boxer',
    year: 2023,
    registrationNumber: 'PEU-7711',
    color: 'Dark Blue',
    status: 'available' as const,
  },
  {
    manufacturer: 'Citroën',
    model: 'Jumper',
    year: 2021,
    registrationNumber: 'CIT-3344',
    color: 'Grey',
    status: 'maintenance' as const,
    notes: 'Transmission issue',
  },
  {
    manufacturer: 'Hyundai',
    model: 'Staria Load',
    year: 2024,
    registrationNumber: 'HYU-5566',
    color: 'White',
    status: 'available' as const,
    notes: 'Fleet vehicle',
  },
  {
    manufacturer: 'Nissan',
    model: 'NV400',
    year: 2022,
    registrationNumber: 'NIS-2233',
    color: 'Red',
    status: 'in_transit' as const,
  },
  {
    manufacturer: 'Mercedes-Benz',
    model: 'Vito',
    year: 2023,
    registrationNumber: 'MBV-8899',
    color: 'Black',
    status: 'available' as const,
  },
  {
    manufacturer: 'Ford',
    model: 'Ranger',
    year: 2024,
    registrationNumber: 'FOR-1122',
    color: 'Silver',
    status: 'maintenance' as const,
    notes: 'Scheduled service',
  },
  {
    manufacturer: 'Volkswagen',
    model: 'Transporter T7',
    year: 2024,
    registrationNumber: 'VWT-4455',
    color: 'Blue',
    status: 'available' as const,
  },
];

async function seed() {
  console.log('Seeding database...');

  const existing = await db.select({ value: count() }).from(cars).limit(1);
  if (existing[0]?.value > 0) {
    console.log('Deleting existing data...');
    await db.delete(cars);
  }

  for (const car of seedData) {
    await db.insert(cars).values(car);
  }

  console.log(`Inserted ${seedData.length} cars.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
