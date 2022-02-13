import { Inject, Injectable, Scope } from '@nestjs/common';
import { BooksEntity } from './books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/users/users.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import FileReader from 'filereader';
import { uuid } from 'uuidv4';
import admin from 'firebase-admin';

// const fileReader = new FileReader();

@Injectable({ scope: Scope.REQUEST })
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private booksRepository: Repository<BooksEntity>,
    private userService: UserService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async addBook(userId: string, book: Express.Multer.File) {
    const user = await this.userService.getSingleUser(userId);
    this.uploadFile(book);
    // const blob = Buffer.from(image, 'base64');
    return await this.booksRepository.save({ book: book.originalname, user });
  }

  async uploadFile(file) {
    const bucket = admin.storage().bucket();
    console.log('file', file);

    // Uploads a local file to the bucket
    await bucket
      .file(file.originalname)
      .save(file.buffer)
      .then((res) => console.log(res));

    console.log(`${file.originalname} uploaded.`);
  }

  async getFile(file) {
    const bucket = admin.storage().bucket();
    const res = await bucket.file(file).download();
    console.log('file', res);
    return res;
  }

  async getBooks(userId: string) {
    console.log(userId);
    const res = await this.booksRepository.find({
      where: { user: { id: userId } },
    });

    console.log('res', res);

    const resWithBooks = await Promise.all(
      res.map(async (book) => ({
        ...book,
        file: await this.getFile(book.book),
      })),
    );

    console.log('resWithBooks', await resWithBooks);

    return await resWithBooks;
  }

  async getSingleBook(bookId: string) {
    const res = await this.booksRepository.findOne(bookId);
    const resWithBook = await { ...res, file: await this.getFile(res.book) };
    return resWithBook;
  }

  async updateBook(bookId: string, name: string) {
    return await this.booksRepository.save({ id: bookId, name });
  }

  async deleteBook(bookId: string) {
    return await this.booksRepository.delete({ id: bookId });
  }
}
