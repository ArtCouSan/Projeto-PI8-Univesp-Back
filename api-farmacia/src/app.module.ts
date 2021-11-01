import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AuthModule } from './auth/auth.module';
import { FarmaciaModule } from './farmacia/farmacia.module';

@Module({
  imports: [
    FarmaciaModule, 
    TypeOrmModule.forRoot(typeOrmConfig), 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
