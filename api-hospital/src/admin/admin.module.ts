import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminRepository } from './repo/admin.repo';
import { AdminService } from './service/admin.service';

@Module({  
  imports: [
  TypeOrmModule.forFeature([AdminRepository]),
  forwardRef(() => AuthModule), 
],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
