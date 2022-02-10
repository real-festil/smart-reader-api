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
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (req.params.postId && isUUID.v4(req.params.postId)) {
      const post = await this.booksRepository.findOne(req.params.postId, {
        relations: ['user'],
      });
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      if (post.user.id === req.user.id) {
        return true;
      } else {
        throw new ForbiddenException('User does not have permission');
      }
    } else {
      throw new ForbiddenException('Invalid post id type');
    }
  }
}

@Injectable()
export class BookNotExistsGuard implements CanActivate {
  constructor(
    @InjectRepository(BooksEntity)
    private booksRepository: Repository<BooksEntity>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = await this.booksRepository.findOne({
      id: req.params.postId,
    });

    if (!user) {
      throw new ForbiddenException('Post with this id not exists');
    }
    return true;
  }
}
