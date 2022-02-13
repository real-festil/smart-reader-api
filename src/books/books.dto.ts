import { IsBase64, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddBookDto {
  @ApiProperty({
    type: 'string',
    description: 'Book',
    required: true,
  })
  @IsNotEmpty()
  book: string;
}

export class UpdateBookDto {
  @ApiProperty({
    type: 'string',
    description: 'Book',
    required: true,
  })
  @IsNotEmpty()
  book: string;
}
