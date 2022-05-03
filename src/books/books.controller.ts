import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { Param, UseGuards } from '@nestjs/common';
import { UserNotExistsGuard } from '../users/users.guard';
import { BooksService } from './books.service';
import { BookOwnerGuard } from './books.guard';
import { AddBookDto, UpdateBookDto } from './books.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import fetch from 'node-fetch';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';

@UseGuards(UserNotExistsGuard)
@Controller('/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @ApiTags('Books')
  @ApiOperation({ summary: 'Add book' })
  @UseInterceptors(FileInterceptor('book', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0].replace(/\s/g, '');
        const fileExtName = extname(file.originalname);
        const randomName = Array(4)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        callback(null, `${name}-${randomName}${fileExtName}`);
      },
    }),
    preservePath: true,
  }))
  @Post()
  async addBook(
    @CurrentUser('id') userId,
    @UploadedFile() book: Express.Multer.File,
    // @Res() res: any
  ) {
    console.log('book', book);
    if (!book) return await fetch('https://cataas.com/cat');
    const serviceData = await this.booksService.addBook(userId, book);
    return serviceData.repoRes;
    // const file = createReadStream(serviceData.uploadedBook.output);
    // await file.pipe(res);
  }

  @ApiTags('Books')
  @ApiOperation({ summary: 'Delete book' })
  @UseGuards(BookOwnerGuard, UserNotExistsGuard)
  @Delete(':bookId')
  async deleteBook(@Param('bookId') bookId: string) {
    return await this.booksService.deleteBook(bookId);
  }

  @ApiTags('Books')
  @ApiOperation({ summary: 'Get all books' })
  @Get()
  async getBooks(@CurrentUser('id') userId) {
    return await this.booksService.getBooks(userId);
  }

  @ApiTags('Books')
  @ApiOperation({ summary: 'Get single book file' })
  @UseGuards(BookOwnerGuard)
  @Get(':bookId')
  async getSingleBookFile(
    @Param('bookId')
    bookId: string,
    @Res() res: any
  ) {
    console.log('this')
    const book = await this.booksService.getSingleBookFile(bookId);
    console.log('book', book)
    const file = createReadStream(book.localPath);
    await file.pipe(res);
  }

  // @ApiTags('Books')
  // @ApiOperation({ summary: 'Get single book' })
  // @UseGuards(BookOwnerGuard)
  // @Get(':bookId')
  // async getSingleBook(
  //   @Param('bookId')
  //   bookId: string,
  // ) {
  //   return await this.booksService.getSingleBook(bookId);
  // }

  @ApiTags('Books')
  @ApiOperation({ summary: 'Update book' })
  @UseGuards(BookOwnerGuard)
  @Patch(':bookId')
  async updateBook(
    @Param('bookId')
    bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.updateBook(bookId, updateBookDto.book);
  }
}
