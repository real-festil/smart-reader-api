// import { IsBase64, IsNotEmpty, IsOptional } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class AddPostDto {
//   @ApiProperty({
//     type: 'string',
//     description: 'Bio',
//     required: true,
//   })
//   @IsNotEmpty()
//   bio: string;

//   @ApiProperty({
//     type: 'string',
//     description: 'image',
//     required: true,
//   })
//   @IsNotEmpty()
//   @IsBase64()
//   image: string;
// }

// export class UpdatePostDto {
//   @ApiProperty({
//     type: 'string',
//     description: 'Bio',
//     required: false,
//   })
//   @IsNotEmpty()
//   @IsOptional()
//   bio: string;

//   @ApiProperty({
//     type: 'string',
//     description: 'image',
//     required: true,
//   })
//   @IsNotEmpty()
//   @IsBase64()
//   image: string;
// }
