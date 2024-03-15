import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [],
  logging: false, //process.env.NODE_ENV !== 'production' ? true : ['error'] as any,
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
