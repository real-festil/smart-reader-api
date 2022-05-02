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
import { PDFDocument } from 'pdf-lib';

const ebookConverter = require('node-ebook-converter');

@Injectable({ scope: Scope.REQUEST })
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private booksRepository: Repository<BooksEntity>,
    private userService: UserService,
    @Inject(REQUEST) private readonly request: Request,
  ) { }

  async addBook(userId: string, book: Express.Multer.File) {
    const user = await this.userService.getSingleUser(userId);
    const uploadedBook = await this.uploadFile(book);
    console.log('uploadedBook', uploadedBook);
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    async function ebookMeta() {
      const { stdout, stderr } = await exec(`ebook-meta ${uploadedBook.output}`);
      return stdout.split('\n').map(el => el.split(':').map(elOfEl => elOfEl.trim())).map(el => ({ [el[0]]: el[1] }));
    }
    let meta = await ebookMeta();
    console.log('meta', meta)
    const parsedMeta = { title: String(Object.values(meta[0])), author: String(Object.values(meta[1])) };
    console.log('parsedMeta', parsedMeta)
    const repoRes = await this.booksRepository.save({ book: book.originalname, title: parsedMeta.title, author: parsedMeta.author, user, localPath: uploadedBook.output });
    delete repoRes.user;
    return { uploadedBook, repoRes };
  }

  async uploadFile(file) {
    return await ebookConverter.convert({
      input: '/home/danilanpilov/api/smart-reader-api/' + file.destination + '/' + file.filename,
      output: "/home/danilanpilov/api/smart-reader-api/pdfBooks/" + file.filename + '.pdf',
      delete: true,
    })
  }

  async getFile(file) {
    // const bucket = admin.storage().bucket();
    // const res = await bucket.file(file).download();
    // console.log('file', res);
    // return res;
    return file;
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

  async getSingleBookFile(bookId: string) {
    const res = await this.booksRepository.findOne(bookId);
    return res;
  }

  async updateBook(bookId: string, name: string) {
    return await this.booksRepository.save({ id: bookId, name });
  }

  async deleteBook(bookId: string) {
    return await this.booksRepository.delete({ id: bookId });
  }
}
function createReadStream(arg0: any) {
  throw new Error('Function not implemented.');
}

function join(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}

