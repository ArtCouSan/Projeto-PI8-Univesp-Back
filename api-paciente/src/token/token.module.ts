import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PacienteModule } from 'src/paciente/paciente.module';
import { TokenPacienteRepository } from './repo/token.repo';
import { TokenService } from './service/token.service';
import { TokenController } from './token.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenPacienteRepository]),
    forwardRef(() => AuthModule),
    PacienteModule
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
