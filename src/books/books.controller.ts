import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { Param, UseGuards } from '@nestjs/common';
import { UserNotExistsGuard } from '../users/users.guard';
import { BooksService } from './posts.service';
import { BookOwnerGuard } from './books.guard';
import { AddBookDto, UpdateBookDto } from './books.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@UseGuards(UserNotExistsGuard)
@Controller('/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiTags('Books')
  @ApiOperation({ summary: 'Add book' })
  @Post()
  async addBook(@CurrentUser('id') userId, @Body() addBookDto: AddBookDto) {
    return await this.booksService.addBook(userId, addBookDto.book);
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
  async getBooks(@Query('userId') userId: string) {
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
