import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FarmaceuticoUpdateDTO } from './dto/farmaceutico-update.dto';
import { FarmaceuticoDTO } from './dto/farmaceutico.dto';
import { FarmaceuticoService } from './service/farmaceutico.service';
import { AuthGuard } from '@nestjs/passport';
import { FarmaceuticoLoginDTO } from './dto/farmaceutico-login.dto';

@Controller('api/v1/farmaceutico')
export class FarmaceuticoController {
    
    constructor(private farmaceuticoService: FarmaceuticoService, private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
      return this.authService.login(req);
    }

    @Post()
    async criarFarmaceutico(@Body() farmaceuticoDTO: FarmaceuticoDTO) {
      const farmaceutico = await this.farmaceuticoService.criarFarmaceutico(farmaceuticoDTO);
      return JSON.parse(JSON.stringify(farmaceutico));
    }

    @Get("/listar-cnpj/:crf")
    async listarFarmaceuticosPeloCRF(@Param('crf') crf: string) {
      const farmaceuticos = await this.farmaceuticoService.listarFarmaceuticosPeloCRF(crf);
      const cnpjs = [];
      farmaceuticos.forEach(f => {
        cnpjs.push({
          "name": f.farmacia.nomeFilial,
          "code": f.cnpjFarmacia
        });
      })
      return JSON.parse(JSON.stringify(cnpjs));
    }
  
    @Get()
    async listarFarmaceuticos() {
      const farmaceuticos = await this.farmaceuticoService.listarFarmaceuticos();
      return JSON.parse(JSON.stringify(farmaceuticos));
    }
  
    @Get("/:crf/:cnpjFarmacia")
    async pegarFarmaceutico(@Param('crf') crf: string, @Param('cnpjFarmacia') cnpjFarmacia: string) {
      const farmaceutico = await this.farmaceuticoService.pegarFarmaceutico(crf, cnpjFarmacia);
      return JSON.parse(JSON.stringify(farmaceutico));
    }
  
    @Delete("/:crf/:cnpjFarmacia")
    async deletarFarmaceutico(@Param('crf') crf: string, @Param('cnpjFarmacia') cnpjFarmacia: string) {
      await this.farmaceuticoService.deletarFarmaceutico(crf, cnpjFarmacia);
      return JSON.parse(JSON.stringify('{"message":"Deletado com sucesso"}'));
    }
  
    @Put("/:crf/:cnpjFarmacia")
    async atualizarFarmaceutico(@Param('crf') crf: string, @Param('cnpjFarmacia') cnpjFarmacia: string, @Body() farmaceuticoDTO: FarmaceuticoUpdateDTO) {
      const farmaceutico = await this.farmaceuticoService.atualizarFarmaceutico(crf, cnpjFarmacia, farmaceuticoDTO);
      return JSON.parse(JSON.stringify(farmaceutico));
    }
}

