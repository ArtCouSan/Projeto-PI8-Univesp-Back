import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'local',
  entities: [
    "dist/src/paciente/models/*.js",
    "dist/src/token/models/*.js"
  ],
  synchronize: true,
};