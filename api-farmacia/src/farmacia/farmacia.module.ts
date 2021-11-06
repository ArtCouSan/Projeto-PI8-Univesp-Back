import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FarmaciaController } from './farmacia.controller';
import { FarmaciaRepository } from './repo/farmacia.repo';
import { FarmaciaService } from './service/farmacia.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmaciaRepository]),
    forwardRef(() => AuthModule)
  ],
  controllers: [FarmaciaController],
  providers: [FarmaciaService],
  exports: [FarmaciaService]
})
export class FarmaciaModule {}
