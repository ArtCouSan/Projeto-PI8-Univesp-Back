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
  @Get()
  async listarFarmacias() {
    const farmacias = await this.farmaciaService.listarFarmacias();
    return JSON.parse(JSON.stringify(farmacias));
  }

  @UseGuards(JwtAuthGuard)
  @Get(":cnpj")
  async pegarFarmacia(@Param('cnpj') cnpj: string) {
    const farmacia = await this.farmaciaService.pegarFarmacia(cnpj);
    return JSON.parse(JSON.stringify(farmacia));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":cnpj")
  async deletarFarmacia(@Param('cnpj') cnpj: string) {
    await this.farmaciaService.deletarFarmacia(cnpj);
    return JSON.parse(JSON.stringify('{"message":"Deletado com sucesso"}'));
  }

  @UseGuards(JwtAuthGuard)
  @Put(":cnpj")
  async atualizarFarmacia(@Param('cnpj') cnpj: string, @Body() farmaciaDTO: FarmaciaUpdateDTO) {
    const farmacia = await this.farmaciaService.atualizarFarmacia(cnpj, farmaciaDTO);
    return JSON.parse(JSON.stringify(farmacia));
  }

}

