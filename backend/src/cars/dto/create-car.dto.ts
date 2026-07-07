import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  MinLength,
  IsOptional,
  IsIn,
} from 'class-validator';

const CAR_STATUSES = ['available', 'maintenance', 'in_transit'] as const;

export class CreateCarDto {
  @ApiProperty({ example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  manufacturer: string;

  @ApiProperty({ example: 'Camry' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  model: string;

  @ApiProperty({ example: 2020 })
  @IsInt()
  @Min(1886)
  @Max(2100)
  year: number;

  @ApiProperty({ example: 'Red' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ example: 'ABC-1234' })
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @ApiProperty({ example: 'available', enum: CAR_STATUSES })
  @IsString()
  @IsIn(CAR_STATUSES)
  status: string;

  @ApiPropertyOptional({ example: 'Recently serviced' })
  @IsOptional()
  @IsString()
  notes?: string;
}
