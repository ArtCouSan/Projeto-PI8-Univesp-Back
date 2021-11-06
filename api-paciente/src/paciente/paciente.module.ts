import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PacienteController } from './paciente.controller';
import { PacienteRepository } from './repo/paciente.repo';
import { PacienteService } from './service/paciente.service';

@Module({  
  imports: [
  TypeOrmModule.forFeature([PacienteRepository]),
  forwardRef(() => AuthModule)
],
  controllers: [PacienteController],
  providers: [PacienteService],
  exports: [PacienteService]
})
export class PacienteModule {}
