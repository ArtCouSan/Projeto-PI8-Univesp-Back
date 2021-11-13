import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitaController } from './receita.controller';
import { ReceitaRepository } from './repo/receita.repo';
import { ReceitaService } from './service/receita.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceitaRepository]),
    HttpModule
  ],
    controllers: [ReceitaController],
    providers: [ReceitaService],
    exports: [ReceitaService]
})
export class ReceitaModule {}
