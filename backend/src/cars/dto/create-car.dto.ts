import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsNumber,
  MinLength,
} from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  brand: string;

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

  @ApiProperty({ example: 'ABC-1234' })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({ example: 'Red' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ example: 25000 })
  @IsNumber()
  @Min(0)
  price: number;
}
