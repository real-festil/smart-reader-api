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
} from '@nestjs/common';
import { Param, UseGuards } from '@nestjs/common';
import { UserNotExistsGuard } from '../users/users.guard';
import { BooksService } from './books.service';
import { BookOwnerGuard } from './books.guard';
import { AddBookDto, UpdateBookDto } from './books.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(UserNotExistsGuard)
@Controller('/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiTags('Books')
  @ApiOperation({ summary: 'Add book' })
  @UseInterceptors(FileInterceptor('book'))
  @Post()
  async addBook(
    @CurrentUser('id') userId,
    @UploadedFile() book: Express.Multer.File,
  ) {
    console.log('book', book);
    if (!book) return 'Danil ti loshara';
    return await this.booksService.addBook(userId, book);
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
  @ApiOperation({ summary: 'Get single book' })
  @UseGuards(BookOwnerGuard)
  @Get(':bookId')
  async getSingleBook(
    @Param('bookId')
    bookId: string,
  ) {
    return await this.booksService.getSingleBook(bookId);
  }

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
