import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { HospitalController } from './hospital.controller';
import { HospitalRepository } from './repo/hospital.repo';
import { HospitalService } from './service/hospital.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    TypeOrmModule.forFeature([HospitalRepository]),
    HttpModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [HospitalController],
  providers: [HospitalService],
  exports: [HospitalService]
})
export class HospitalModule {}
