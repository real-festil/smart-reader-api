import { Inject, Injectable, Scope } from '@nestjs/common';
import { BooksEntity } from './books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/users/users.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import FileReader from 'filereader';

// const fileReader = new FileReader();

@Injectable({ scope: Scope.REQUEST })
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private booksRepository: Repository<BooksEntity>,
    private userService: UserService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async addBook(userId: string, image: string) {
    const user = await this.userService.getSingleUser(userId);
    const blob = Buffer.from(image, 'base64');
    return await this.booksRepository.save({ image: blob, user });
  }

  async getBooks(userId: string) {
    console.log(userId);
    const res = await this.booksRepository.find({
      where: { user: { id: userId } },
    });

    return res.map((book) => ({
      ...book,
      image: book.image.toString('base64'),
    }));
  }

  async getSingleBook(bookId: string) {
    return await this.booksRepository.findOne(bookId);
  }

  async updateBook(bookId: string, name: string) {
    return await this.booksRepository.save({ id: bookId, name });
  }

  async deleteBook(bookId: string) {
    return await this.booksRepository.delete({ id: bookId });
  }
}
