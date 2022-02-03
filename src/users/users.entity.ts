import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { PostsEntity } from '../posts/posts.entity';

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

  @Column({ type: 'varchar', length: 200 })
  appleId: string;

  // @OneToMany(() => PostsEntity, (posts) => posts.user)
  // posts: PostsEntity[];
}
