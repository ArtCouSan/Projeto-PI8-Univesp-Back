import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmaceuticoController } from './farmaceutico.controller';
import { FarmaceuticoRepository } from './repo/farmaceutico.repo';
import { FarmaceuticoService } from './service/farmaceutico.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmaceuticoRepository]),
    HttpModule
  ],
  controllers: [FarmaceuticoController],
  providers: [FarmaceuticoService]
})
export class FarmaceuticoModule {}
