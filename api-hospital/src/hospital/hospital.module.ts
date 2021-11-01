import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalController } from './hospital.controller';
import { HospitalRepository } from './repo/hospital.repo';
import { HospitalService } from './service/hospital.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HospitalRepository]),
  ],
  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalModule {}
