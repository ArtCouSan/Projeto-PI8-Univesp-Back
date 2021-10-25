import { Module } from '@nestjs/common';
import { typeOrmConfig } from 'typeorm.config';
import { FarmaceuticoModule } from './farmaceutico/farmaceutico.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    FarmaceuticoModule, 
    TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
