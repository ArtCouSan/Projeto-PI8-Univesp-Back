import { Request, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FarmaciaUpdateDTO } from './dto/farmacia-update.dto';
import { FarmaciaDTO } from './dto/farmacia.dto';
import { FarmaciaService } from './service/farmacia.service';

@Controller('api/v1/farmacia')
export class FarmaciaController {

  constructor(private readonly farmaciaService: FarmaciaService, private readonly authService: AuthService){}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post()
  async criarFarmacia(@Body() farmaciaDTO: FarmaciaDTO) {
    const farmacia = await this.farmaciaService.criarFarmacia(farmaciaDTO);
    return JSON.parse(JSON.stringify(farmacia));
  }

  @UseGuards(JwtAuthGuard)
  @Get("/listar")
  async listarFarmacias() {
    const farmacias = await this.farmaciaService.listarFarmacias();
    return JSON.parse(JSON.stringify(farmacias));
  }

  @Get(":cnpj")
  async pegarFarmacia(@Param('cnpj') cnpj: string) {
    const farmacia = await this.farmaciaService.pegarFarmacia(cnpj);
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

