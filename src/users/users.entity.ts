import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BooksEntity } from '../books/books.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  appleId?: string;

  @Column({ type: 'boolean' })
  isVerified?: boolean;

  @OneToMany(() => BooksEntity, (books) => books.user)
  books: BooksEntity[];
}
