import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { PacienteModule } from './paciente/paciente.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PacienteModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
