import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  // url: process.env.DATABASE_URL,
  // type: 'postgres',
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  username: 'root',
  password: 'root',
  host: '127.0.0.1',
  database: 'smart_reader_db',
  type: 'mysql',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
