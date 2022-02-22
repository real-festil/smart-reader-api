import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksEntity } from './books.entity';
import * as isUUID from 'is-uuid';

@Injectable()
export class BookOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(BooksEntity)
    private booksRepository: Repository<BooksEntity>,
  ) { }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (req.params.bookId && isUUID.v4(req.params.bookId)) {
      const book = await this.booksRepository.findOne(req.params.bookId, {
        relations: ['user'],
      });
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      if (book.user.id === req.user.id) {
        return true;
      } else {
        throw new ForbiddenException('User does not have permission');
      }
    } else {
      throw new ForbiddenException('Invalid book id type');
    }
  }
}

@Injectable()
export class BookNotExistsGuard implements CanActivate {
  constructor(
    @InjectRepository(BooksEntity)
    private booksRepository: Repository<BooksEntity>,
  ) { }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = await this.booksRepository.findOne({
      id: req.params.bookId,
    });

    if (!user) {
      throw new ForbiddenException('Book with this id not exists');
    }
    return true;
  }
}
