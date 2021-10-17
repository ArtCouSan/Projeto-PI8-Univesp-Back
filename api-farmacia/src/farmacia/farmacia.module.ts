import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmaciaController } from './farmacia.controller';
import { FarmaciaRepository } from './repo/farmacia.repo';
import { FarmaciaService } from './service/farmacia.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmaciaRepository]),
  ],
  controllers: [FarmaciaController],
  providers: [FarmaciaService]
})
export class FarmaciaModule {}
