import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FarmaceuticoUpdateDTO } from './dto/farmaceutico-update.dto';
import { FarmaceuticoDTO } from './dto/farmaceutico.dto';
import { FarmaceuticoService } from './service/farmaceutico.service';

@Controller('api/v1/farmaceutico')
export class FarmaceuticoController {
    
    constructor(private farmaceuticoService: FarmaceuticoService){}

    @Post()
    async criarFarmaceutico(@Body() farmaceuticoDTO: FarmaceuticoDTO) {
      const farmaceutico = await this.farmaceuticoService.criarFarmaceutico(farmaceuticoDTO);
      return JSON.parse(JSON.stringify(farmaceutico));
    }
  
    @Get()
    async listarFarmaceuticos() {
      const farmaceuticos = await this.farmaceuticoService.listarFarmaceuticos();
      return JSON.parse(JSON.stringify(farmaceuticos));
    }
  
    @Get(":crf")
    async pegarFarmaceutico(@Param('crf') crf: string) {
      const farmaceutico = await this.farmaceuticoService.pegarFarmaceutico(crf);
      return JSON.parse(JSON.stringify(farmaceutico));
    }
  
    @Delete(":crf")
    async deletarFarmaceutico(@Param('crf') crf: string) {
      await this.farmaceuticoService.deletarFarmaceutico(crf);
      return JSON.parse(JSON.stringify('{"message":"Deletado com sucesso"}'));
    }
  
    @Put(":crf")
    async atualizarFarmaceutico(@Param('crf') crf: string, @Body() farmaceuticoDTO: FarmaceuticoUpdateDTO) {
      const farmaceutico = await this.farmaceuticoService.atualizarFarmaceutico(crf, farmaceuticoDTO);
      return JSON.parse(JSON.stringify(farmaceutico));
    }

}
