import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { MedicoModule } from './medico/medico.module';
import { HospitalModule } from './hospital/hospital.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MedicoModule,
    HospitalModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
