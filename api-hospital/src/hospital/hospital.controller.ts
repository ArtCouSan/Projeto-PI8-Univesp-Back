import { Request, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HospitalUpdateDTO } from './dto/hospital-update.dto';
import { HospitalDTO } from './dto/hospital.dto';
import { HospitalService } from './service/hospital.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('api/v1/hospital')
export class HospitalController {
    
    constructor(private hospitalService: HospitalService, private readonly authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
  
    @Post()
    async criarHospital(@Body() medicoDTO: HospitalDTO) {
      const hospital = await this.hospitalService.criarHospital(medicoDTO);
      return JSON.parse(JSON.stringify(hospital));
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async listarHospitais() {
      const hospitais = await this.hospitalService.listarHospitais();
      return JSON.parse(JSON.stringify(hospitais));
    }
  
    @Get(":cnpj")
    async pegarHospital(@Param('cnpj') cnpj: string) {
      const hospital = await this.hospitalService.pegarHospital(cnpj);
      return JSON.parse(JSON.stringify(hospital));
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(":cnpj")
    async deletarHospital(@Param('cnpj') cnpj: string) {
      await this.hospitalService.deletarHospital(cnpj);
      return JSON.parse(JSON.stringify('{"message":"Deletado com sucesso"}'));
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(":cnpj")
    async atualizarHospital(@Param('cnpj') cnpj: string, @Body() hospitalDTO: HospitalUpdateDTO) {
      const hospital = await this.hospitalService.atualizarHospital(cnpj, hospitalDTO);
      return JSON.parse(JSON.stringify(hospital));
    }


}
