import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FarmaciaUpdateDTO } from './dto/farmacia-update.dto';
import { FarmaciaDTO } from './dto/farmacia.dto';
import { FarmaciaService } from './service/farmacia.service';

@Controller('api/v1/farmacia')
export class FarmaciaController {

  constructor(private farmaciaService: FarmaciaService){}

  @Post()
  async criarFarmacia(@Body() farmaciaDTO: FarmaciaDTO) {
    const farmacia = await this.farmaciaService.criarFarmacia(farmaciaDTO);
    return JSON.parse(JSON.stringify(farmacia));
  }

  @Get()
  async listarFarmacias() {
    const farmacias = await this.farmaciaService.listarFarmacias();
    return JSON.parse(JSON.stringify(farmacias));
  }

  @Get(":cnpj")
  async pegarFarmacia(@Param('cnpj') cnpj: string) {
    const farmacia = await this.farmaciaService.pegarFarmacia(cnpj);
    return JSON.parse(JSON.stringify(farmacia));
  }

  @Delete(":cnpj")
  async deletarFarmacia(@Param('cnpj') cnpj: string) {
    await this.farmaciaService.deletarFarmacia(cnpj);
    return JSON.parse(JSON.stringify('{"message":"Deletado com sucesso"}'));
  }

  @Put(":cnpj")
  async atualizarFarmacia(@Param('cnpj') cnpj: string, @Body() farmaciaDTO: FarmaciaUpdateDTO) {
    const farmacia = await this.farmaciaService.atualizarFarmacia(cnpj, farmaciaDTO);
    return JSON.parse(JSON.stringify(farmacia));
  }

}
