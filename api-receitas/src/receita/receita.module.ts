import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivoSchema } from './models/mongodb/arquivo.entity';
import { ReceitaController } from './receita.controller';
import { ReceitaRepository } from './repo/receita.repo';
import { ReceitaService } from './service/receita.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceitaRepository]),
    MongooseModule.forFeature([{
      name: 'Arquivo', schema: ArquivoSchema,
    }]),
    HttpModule
  ],
    controllers: [ReceitaController],
    providers: [ReceitaService],
    exports: [ReceitaService]
})
export class ReceitaModule {}
