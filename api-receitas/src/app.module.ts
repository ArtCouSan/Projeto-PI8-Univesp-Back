import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { ReceitaController } from './receita/receita.controller';
import { ReceitaModule } from './receita/receita.module';
import { ReceitaService } from './receita/service/receita.service';

@Module({
  imports: [
    ReceitaModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ]
})
export class AppModule {}
