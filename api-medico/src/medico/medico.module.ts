import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MedicoController } from './medico.controller';
import { MedicoRepository } from './repo/medico.repo';
import { MedicoService } from './service/medico.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicoRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [MedicoController],
  providers: [MedicoService],
  exports: [MedicoService]
})
export class MedicoModule {}
