import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity('posts')
export class BooksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  image: any;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
