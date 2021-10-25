import { Module } from '@nestjs/common';
import { FarmaciaModule } from './farmacia/farmacia.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    FarmaciaModule, 
    TypeOrmModule.forRoot(typeOrmConfig), 
    AdminModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
