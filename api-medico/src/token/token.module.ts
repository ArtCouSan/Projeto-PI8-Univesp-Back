import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MedicoModule } from 'src/medico/medico.module';
import { TokenMedicoRepository } from './repo/token.repo';
import { TokenService } from './service/token.service';
import { TokenController } from './token.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenMedicoRepository]),
    forwardRef(() => AuthModule),
    MedicoModule
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
