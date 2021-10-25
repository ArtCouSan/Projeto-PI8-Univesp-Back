import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteController } from './paciente.controller';
import { PacienteRepository } from './repo/paciente.repo';
import { PacienteService } from './service/paciente.service';

@Module({  
  imports: [
  TypeOrmModule.forFeature([PacienteRepository]),
],
  controllers: [PacienteController],
  providers: [PacienteService]
})
export class PacienteModule {}
