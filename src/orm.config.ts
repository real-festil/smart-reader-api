import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  // url: process.env.DATABASE_URL,
  // type: 'postgres',
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  port: 1434,
  username: 'root',
  password: 'Smart-reader1',
  host: 'localhost',
  database: 'puregram_db',
  type: 'mysql',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
