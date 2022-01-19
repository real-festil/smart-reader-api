import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  bio: string;

  @Column({ type: 'varchar' })
  image: any;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
