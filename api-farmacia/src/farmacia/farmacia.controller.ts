import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FarmaciaUpdateDTO } from './dto/farmacia-update.dto';
import { FarmaciaDTO } from './dto/farmacia.dto';
import { FarmaciaService } from './service/farmacia.service';

@Controller('api/v1/farmacia')
export class FarmaciaController {

  constructor(private farmaciaService: FarmaciaService){}

  @UseGuards(JwtAuthGuard)
  @Post()
  async criarFarmacia(@Body() farmaciaDTO: FarmaciaDTO) {
    const farmacia = await this.farmaciaService.criarFarmacia(farmaciaDTO);
    return JSON.parse(JSON.stringify(farmacia));
  }

  @UseGuards(JwtAuthGuard)
  @Get(":cnpj/listar")
  async listarFarmacias(@Param('cnpj') cnpj: string) {
    const farmacias = await this.farmaciaService.listarFarmacias(cnpj);
    return JSON.parse(JSON.stringify(farmacias));
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async pegarFarmacia(@Param('id') id: string) {
    const farmacia = await this.farmaciaService.pegarFarmacia(id);
    return JSON.parse(JSON.stringify(farmacia));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deletarFarmacia(@Param('id') id: string) {
    await this.farmaciaService.deletarFarmacia(id);
    return JSON.parse(JSON.stringify('{"message":"Deletado com sucesso"}'));
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async atualizarFarmacia(@Param('id') id: string, @Body() farmaciaDTO: FarmaciaUpdateDTO) {
    const farmacia = await this.farmaciaService.atualizarFarmacia(id, farmaciaDTO);
    return JSON.parse(JSON.stringify(farmacia));
  }

}

