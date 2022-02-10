import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksEntity } from './books.entity';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([BooksEntity, User]), UsersModule],
  exports: [BooksService],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
