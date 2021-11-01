import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FarmaceuticoController } from './farmaceutico.controller';
import { FarmaceuticoRepository } from './repo/farmaceutico.repo';
import { FarmaceuticoService } from './service/farmaceutico.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmaceuticoRepository]),
    HttpModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [FarmaceuticoController],
  providers: [FarmaceuticoService],
  exports: [FarmaceuticoService]
})
export class FarmaceuticoModule {}
