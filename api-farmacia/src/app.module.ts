import { Module } from '@nestjs/common';
import { FarmaciaModule } from './farmacia/farmacia.module';
import { FarmaceuticoModule } from './farmaceutico/farmaceutico.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';

@Module({
  imports: [
    FarmaciaModule, 
    FarmaceuticoModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
