import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { ReceitaModule } from './receita/receita.module';

@Module({
  imports: [
    ReceitaModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot('mongodb://localhost:27017/local'),
  ]
})
export class AppModule {}
