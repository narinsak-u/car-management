import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CarsService } from '../src/cars/cars.service';
import { CarsRepository } from '../src/cars/cars.repository';
import { CreateCarDto } from '../src/cars/dto/create-car.dto';
import { UpdateCarDto } from '../src/cars/dto/update-car.dto';
import { QueryCarDto } from '../src/cars/dto/query-car.dto';

const mockCar = {
  id: 1,
  manufacturer: 'Toyota',
  model: 'Camry',
  year: 2020,
  color: 'Red',
  registrationNumber: 'ABC-1234',
  status: 'available',
  notes: null,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

const mockCarWithNotes = {
  ...mockCar,
  notes: 'Recently serviced',
};

const mockRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CarsService', () => {
  let service: CarsService;
  let repository: typeof mockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        { provide: CarsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
    repository = module.get(CarsRepository);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('delegates to repository and returns the created car', async () => {
      const dto: CreateCarDto = {
        manufacturer: 'Toyota',
        model: 'Camry',
        year: 2020,
        color: 'Red',
        registrationNumber: 'ABC-1234',
        status: 'available',
        notes: 'Recently serviced',
      };

      mockRepository.create.mockResolvedValue(mockCarWithNotes);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockCarWithNotes);
    });

    it('creates a car without optional notes', async () => {
      const dto: CreateCarDto = {
        manufacturer: 'Toyota',
        model: 'Camry',
        year: 2020,
        color: 'Red',
        registrationNumber: 'ABC-1234',
        status: 'available',
      };

      mockRepository.create.mockResolvedValue(mockCar);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(result.notes).toBeNull();
    });
  });

  describe('findAll', () => {
    it('delegates to repository and returns paginated result', async () => {
      const query: QueryCarDto = { page: 1, limit: 10 };
      const paginatedResult = {
        data: [mockCar],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      };

      mockRepository.findAll.mockResolvedValue(paginatedResult);

      const result = await service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(paginatedResult);
    });

    it('returns empty data when no cars match', async () => {
      const query: QueryCarDto = {
        page: 1,
        limit: 10,
        manufacturer: 'NonExistent',
      };
      const emptyResult = {
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
      };

      mockRepository.findAll.mockResolvedValue(emptyResult);

      const result = await service.findAll(query);

      expect(result.data).toHaveLength(0);
      expect(result.meta.total).toBe(0);
    });

    it('uses default pagination when no query is provided', async () => {
      const query = new QueryCarDto();

      mockRepository.findAll.mockResolvedValue({
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
      });

      await service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
          limit: 10,
        }),
      );
    });
  });

  describe('findById', () => {
    it('returns the car when found', async () => {
      mockRepository.findById.mockResolvedValue(mockCar);

      const result = await service.findById(1);

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCar);
    });

    it('throws NotFoundException when car is not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
      await expect(service.findById(999)).rejects.toThrow(
        'Car with id 999 not found',
      );
    });

    it('throws NotFoundException for negative id', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findById(-1)).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException for zero id', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findById(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('updates the car when found', async () => {
      const dto: UpdateCarDto = { color: 'Blue' };
      const updatedCar = { ...mockCar, color: 'Blue' };

      mockRepository.findById.mockResolvedValue(mockCar);
      mockRepository.update.mockResolvedValue(updatedCar);

      const result = await service.update(1, dto);

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(repository.update).toHaveBeenCalledWith(1, dto);
      expect(result.color).toBe('Blue');
    });

    it('throws NotFoundException when car to update is not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.update(999, { color: 'Blue' })).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when repository returns null after update', async () => {
      mockRepository.findById.mockResolvedValue(mockCar);
      mockRepository.update.mockResolvedValue(null);

      await expect(service.update(1, { color: 'Blue' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('deletes the car when found', async () => {
      mockRepository.findById.mockResolvedValue(mockCar);
      mockRepository.delete.mockResolvedValue(mockCar);

      const result = await service.delete(1);

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCar);
    });

    it('throws NotFoundException when car to delete is not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
      expect(repository.delete).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when repository returns null after delete', async () => {
      mockRepository.findById.mockResolvedValue(mockCar);
      mockRepository.delete.mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
