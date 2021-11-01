import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admin/admin.module';
import { AuthModule } from 'src/auth/auth.module';
import { TokenHospitalRepository } from './repo/token.repo';
import { TokenService } from './service/token.service';
import { TokenController } from './token.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenHospitalRepository]),
    forwardRef(() => AuthModule),
    AdminModule
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
