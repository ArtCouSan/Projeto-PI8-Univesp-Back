import { Request, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MedicoUpdateDTO } from './dto/medico-update.dto';
import { MedicoDTO } from './dto/medico.dto';
import { MedicoService } from './service/medico.service';

@Controller('api/v1/medico')
export class MedicoController {

    constructor(private medicoService: MedicoService, private readonly authService: AuthService){}
    
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
  
    @Post()
    async criarMedico(@Body() medicoDTO: MedicoDTO) {
      const medico = await this.medicoService.criarMedico(medicoDTO);
      return JSON.parse(JSON.stringify(medico));
    }

    @Get("/listar-cnpj/:crm")
    async listarFarmaceuticosPeloCRM(@Param('crm') crm: string, @Param('cnpjHospital') cnpjHospital: string) {
      const hospitais = await this.medicoService.listarMedicosPeloCRM(crm);
      const cnpjs = [];
      hospitais.forEach(h => {
        cnpjs.push({
          "name": h.hospital.nomeFantasia,
          "code": h.cnpjHospital
        });
      })
      return JSON.parse(JSON.stringify(cnpjs));
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async listarMedicos() {
      const medicos = await this.medicoService.listarMedicos();
      return JSON.parse(JSON.stringify(medicos));
    }
  
    @Get("/:crm/:cnpjHospital")
    async pegarMedico(@Param('crm') crm: string, @Param('cnpjHospital') cnpjHospital: string) {
      const medico = await this.medicoService.pegarMedico(crm, cnpjHospital);
      return JSON.parse(JSON.stringify(medico));
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete("/:crm/:cnpjHospital")
    async deletarMedico(@Param('crm') crm: string, @Param('cnpjHospital') cnpjHospital: string) {
      await this.medicoService.deletarMedico(crm, cnpjHospital);
      return JSON.parse(JSON.stringify('{"message":"Deletado com sucesso"}'));
    }
  
    @UseGuards(JwtAuthGuard)
    @Put("/:crm/:cnpjHospital")
    async atualizarMedico(@Param('crm') crm: string, @Param('cnpjHospital') cnpjHospital: string, @Body() medicoDTO: MedicoUpdateDTO) {
      const medico = await this.medicoService.atualizarMedico(crm, cnpjHospital, medicoDTO);
      return JSON.parse(JSON.stringify(medico));
    }

}
