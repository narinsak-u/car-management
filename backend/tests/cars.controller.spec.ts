import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from '../src/cars/cars.controller';
import { CarsService } from '../src/cars/cars.service';
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

const mockService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CarsController', () => {
  let controller: CarsController;
  let service: typeof mockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [{ provide: CarsService, useValue: mockService }],
    }).compile();

    controller = module.get<CarsController>(CarsController);
    service = module.get(CarsService);

    jest.clearAllMocks();
  });

  describe('POST /cars', () => {
    it('calls service.create with the DTO and returns the result', async () => {
      const dto: CreateCarDto = {
        manufacturer: 'Toyota',
        model: 'Camry',
        year: 2020,
        color: 'Red',
        registrationNumber: 'ABC-1234',
        status: 'available',
      };

      mockService.create.mockResolvedValue(mockCar);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockCar);
    });
  });

  describe('GET /cars', () => {
    it('calls service.findAll with query params and returns paginated result', async () => {
      const query: QueryCarDto = { page: 1, limit: 10 };
      const paginatedResult = {
        data: [mockCar],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      };

      mockService.findAll.mockResolvedValue(paginatedResult);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(paginatedResult);
    });

    it('passes filter params to service', async () => {
      const query: QueryCarDto = {
        page: 1,
        limit: 10,
        manufacturer: 'Toyota',
        status: 'available',
        search: 'ABC',
      };

      mockService.findAll.mockResolvedValue({
        data: [mockCar],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      });

      await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('GET /cars/:id', () => {
    it('calls service.findById with parsed numeric id', async () => {
      mockService.findById.mockResolvedValue(mockCar);

      const result = await controller.findById(1);

      expect(service.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCar);
    });

    it('throws when service throws', async () => {
      mockService.findById.mockRejectedValue(new Error('Not found'));

      await expect(controller.findById(999)).rejects.toThrow('Not found');
    });
  });

  describe('PATCH /cars/:id', () => {
    it('calls service.update with id and DTO', async () => {
      const dto: UpdateCarDto = { color: 'Blue' };
      const updatedCar = { ...mockCar, color: 'Blue' };

      mockService.update.mockResolvedValue(updatedCar);

      const result = await controller.update(1, dto);

      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(result.color).toBe('Blue');
    });
  });

  describe('DELETE /cars/:id', () => {
    it('calls service.delete with parsed numeric id', async () => {
      mockService.delete.mockResolvedValue(mockCar);

      const result = await controller.delete(1);

      expect(service.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCar);
    });
  });
});
