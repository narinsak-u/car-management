/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call */
import { Test, TestingModule } from '@nestjs/testing';
import { CarsRepository } from '../src/cars/cars.repository';
import { QueryCarDto } from '../src/cars/dto/query-car.dto';
import * as schema from '../src/database/schema';

const mockCar = {
  id: 1,
  manufacturer: 'Toyota',
  model: 'Camry',
  year: 2020,
  registrationNumber: 'ABC-1234',
  color: 'Red',
  status: 'available',
  notes: null,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

function createMockDb() {
  const mockReturning: jest.Mock = jest.fn().mockResolvedValue([]);
  const mockValues: jest.Mock = jest.fn(() => ({ returning: mockReturning }));
  const mockInsert: jest.Mock = jest.fn(() => ({ values: mockValues }));

  const mockLimit: jest.Mock = jest.fn().mockResolvedValue([]);
  const mockWhere: jest.Mock = jest.fn(() => ({ limit: mockLimit }));
  const mockFromSelect: jest.Mock = jest.fn(() => ({ where: mockWhere }));
  const mockSelect: jest.Mock = jest.fn(() => ({ from: mockFromSelect }));

  const mockWhereCount: jest.Mock = jest.fn(() =>
    Promise.resolve([{ count: 0 }]),
  );
  const mockFromCount: jest.Mock = jest.fn(() => ({ where: mockWhereCount }));
  const mockSelectCount: jest.Mock = jest.fn(() => ({ from: mockFromCount }));

  const mockSet: jest.Mock = jest.fn(() => ({
    where: jest.fn(() => ({ returning: mockReturning })),
  }));
  const mockUpdate: jest.Mock = jest.fn(() => ({ set: mockSet }));

  const mockDeleteWhere: jest.Mock = jest.fn(() => ({
    returning: mockReturning,
  }));
  const mockDelete: jest.Mock = jest.fn(() => ({ where: mockDeleteWhere }));

  return {
    insert: mockInsert,
    select: jest.fn((fields?: any) => {
      if (fields?.count) return mockSelectCount();
      return mockSelect();
    }),
    update: mockUpdate,
    delete: mockDelete,
    _mockReturning: mockReturning,
    _mockValues: mockValues,
    _mockWhere: mockWhere,
    _mockLimit: mockLimit,
    _mockWhereCount: mockWhereCount,
    _mockSet: mockSet,
    _mockDeleteWhere: mockDeleteWhere,
  };
}

describe('CarsRepository', () => {
  let repository: CarsRepository;
  let mockDb: ReturnType<typeof createMockDb>;

  beforeEach(async () => {
    mockDb = createMockDb();

    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsRepository, { provide: 'DRIZZLE', useValue: mockDb }],
    }).compile();

    repository = module.get<CarsRepository>(CarsRepository);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('inserts into the cars table and returns the created car', async () => {
      mockDb._mockLimit.mockResolvedValue([mockCar]);

      const dto = {
        manufacturer: 'Toyota',
        model: 'Camry',
        year: 2020,
        registrationNumber: 'ABC-1234',
        color: 'Red',
        status: 'available' as const,
      };

      const result = await repository.create(dto);

      expect(mockDb.insert).toHaveBeenCalledWith(schema.cars);
      expect(mockDb._mockValues).toHaveBeenCalledWith(
        expect.objectContaining({
          ...dto,
          notes: null,
          createdAt: expect.any(String) as string,
          updatedAt: expect.any(String) as string,
        }),
      );
      expect(result).toEqual(mockCar);
    });
  });

  describe('findAll', () => {
    it('returns paginated data with metadata', async () => {
      const countResult = Promise.resolve([{ count: 1 }]);
      const countQuery = {
        where: jest.fn(() => countResult),
        then: (resolve: any) => resolve([{ count: 1 }]),
      };
      const dataResult = Promise.resolve([mockCar]);
      const offsetFn = jest.fn(() => dataResult);
      const limitFn = jest.fn(() => ({ offset: offsetFn }));
      const whereFn = jest.fn(() => ({ limit: limitFn }));
      const fromFn = jest.fn(() => ({ where: whereFn }));
      (mockDb.select as jest.Mock).mockImplementation((fields?: any) => {
        if (fields?.count) return { from: () => countQuery };
        return { from: fromFn };
      });

      const query = new QueryCarDto();
      const result = await repository.findAll(query);

      expect(result).toEqual({
        data: [mockCar],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      });
    });

    it('applies manufacturer filter when provided', async () => {
      const countResult = Promise.resolve([{ count: 0 }]);
      const countWhere = jest.fn(() => countResult);
      const countQuery = {
        where: countWhere,
        then: (resolve: any) => resolve([{ count: 0 }]),
      };
      const offsetFn = jest.fn(() => Promise.resolve([]));
      const limitFn = jest.fn(() => ({ offset: offsetFn }));
      const whereFn = jest.fn(() => ({ limit: limitFn }));
      const fromFn = jest.fn(() => ({ where: whereFn }));
      (mockDb.select as jest.Mock).mockImplementation((fields?: any) => {
        if (fields?.count) return { from: () => countQuery };
        return { from: fromFn };
      });

      const query = Object.assign(new QueryCarDto(), {
        manufacturer: 'Toyota',
      });
      await repository.findAll(query);

      expect(whereFn).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('returns the car when found', async () => {
      const mockWhereChain = jest.fn(() => ({
        limit: jest.fn(() => ({
          then: jest.fn((resolve: any) => resolve([mockCar])),
        })),
      }));
      const mockFrom = jest.fn(() => ({ where: mockWhereChain }));
      (mockDb.select as jest.Mock).mockReturnValue({ from: mockFrom });

      const result = await repository.findById(1);

      expect(mockDb.select).toHaveBeenCalled();
      expect(result).toEqual(mockCar);
    });

    it('returns null when car is not found', async () => {
      const mockWhereChain = jest.fn(() => ({
        limit: jest.fn(() => ({
          then: jest.fn((resolve: any) => resolve([])),
        })),
      }));
      const mockFrom = jest.fn(() => ({ where: mockWhereChain }));
      (mockDb.select as jest.Mock).mockReturnValue({ from: mockFrom });

      const result = await repository.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('updates the car and returns it', async () => {
      mockDb._mockReturning.mockResolvedValue([mockCar]);

      const result = await repository.update(1, { color: 'Blue' });

      expect(mockDb.update).toHaveBeenCalledWith(schema.cars);
      expect(mockDb._mockSet).toHaveBeenCalled();
      expect(result).toEqual(mockCar);
    });

    it('returns null when car does not exist', async () => {
      mockDb._mockReturning.mockResolvedValue([]);

      const result = await repository.update(999, { color: 'Blue' });

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deletes the car and returns it', async () => {
      mockDb._mockReturning.mockResolvedValue([mockCar]);

      const result = await repository.delete(1);

      expect(mockDb.delete).toHaveBeenCalledWith(schema.cars);
      expect(result).toEqual(mockCar);
    });

    it('returns null when car does not exist', async () => {
      mockDb._mockReturning.mockResolvedValue([]);

      const result = await repository.delete(999);

      expect(result).toBeNull();
    });
  });
});
