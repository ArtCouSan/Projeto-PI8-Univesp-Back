import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FarmaceuticoUpdateDTO } from './dto/farmaceutico-update.dto';
import { FarmaceuticoDTO } from './dto/farmaceutico.dto';
import { FarmaceuticoService } from './service/farmaceutico.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/farmaceutico')
export class FarmaceuticoController {
    
    constructor(private farmaceuticoService: FarmaceuticoService, private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

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

