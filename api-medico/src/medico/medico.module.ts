import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoController } from './medico.controller';
import { MedicoRepository } from './repo/medico.repo';
import { MedicoService } from './service/medico.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicoRepository]),
  ],
  controllers: [MedicoController],
  providers: [MedicoService]
})
export class MedicoModule {}
