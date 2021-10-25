import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MedicoUpdateDTO } from './dto/medico-update.dto';
import { MedicoDTO } from './dto/medico.dto';
import { MedicoService } from './service/medico.service';

@Controller('api/v1/medico')
export class MedicoController {

    constructor(private medicoService: MedicoService){}

    @Post()
    async criarMedico(@Body() medicoDTO: MedicoDTO) {
      const medico = await this.medicoService.criarMedico(medicoDTO);
      return JSON.parse(JSON.stringify(medico));
    }
  
    @Get()
    async listarMedicos() {
      const medicos = await this.medicoService.listarMedicos();
      return JSON.parse(JSON.stringify(medicos));
    }
  
    @Get(":crm")
    async pegarMedico(@Param('crm') crm: string) {
      const medico = await this.medicoService.pegarMedico(crm);
      return JSON.parse(JSON.stringify(medico));
    }
  
    @Delete(":crm")
    async deletarMedico(@Param('crm') crm: string) {
      await this.medicoService.deletarMedico(crm);
      return JSON.parse(JSON.stringify('{"message":"Deletado com sucesso"}'));
    }
  
    @Put(":crm")
    async atualizarMedico(@Param('crm') crm: string, @Body() medicoDTO: MedicoUpdateDTO) {
      const medico = await this.medicoService.atualizarMedico(crm, medicoDTO);
      return JSON.parse(JSON.stringify(medico));
    }

}
