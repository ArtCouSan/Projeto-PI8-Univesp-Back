import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FarmaceuticoModule } from 'src/farmaceutico/farmaceutico.module';
import { TokenFarmaceuticoRepository } from './repo/token.repo';
import { TokenService } from './service/token.service';
import { TokenController } from './token.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenFarmaceuticoRepository]),
    forwardRef(() => AuthModule),
    FarmaceuticoModule
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
