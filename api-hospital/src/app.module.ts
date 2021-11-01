import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AuthModule } from './auth/auth.module';
import { HospitalModule } from './hospital/hospital.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    HospitalModule, 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
