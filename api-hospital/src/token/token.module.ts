import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { HospitalModule } from 'src/hospital/hospital.module';
import { TokenHospitalRepository } from './repo/token.repo';
import { TokenService } from './service/token.service';
import { TokenController } from './token.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenHospitalRepository]),
    forwardRef(() => AuthModule),
    HospitalModule
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}