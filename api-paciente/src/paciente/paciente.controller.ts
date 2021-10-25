import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PacienteUpdateDTO } from './dto/paciente-update.dto';
import { PacienteDTO } from './dto/paciente.dto';
import { PacienteService } from './service/paciente.service';

@Controller('api/v1/paciente')
export class PacienteController {

    constructor(private pacienteService: PacienteService){}

    @Post()
    async criarPaciente(@Body() pacienteDTO: PacienteDTO) {
      const paciente = await this.pacienteService.criarPaciente(pacienteDTO);
      return JSON.parse(JSON.stringify(paciente));
    }
  
    @Get()
    async listarPacientes() {
      const pacientes = await this.pacienteService.listarPacientes();
      return JSON.parse(JSON.stringify(pacientes));
    }
  
    @Get(":cpf")
    async pegarPaciente(@Param('cpf') cpf: string) {
      const paciente = await this.pacienteService.pegarPaciente(cpf);
      return JSON.parse(JSON.stringify(paciente));
    }
  
    @Delete(":cpf")
    async deletarPaciente(@Param('cpf') cpf: string) {
      await this.pacienteService.deletarPaciente(cpf);
      return JSON.parse(JSON.stringify('{"message":"Deletado com sucesso"}'));
    }
  
    @Put(":cpf")
    async atualizarPaciente(@Param('cpf') cpf: string, @Body() pacienteDTO: PacienteUpdateDTO) {
      const paciente = await this.pacienteService.atualizarPaciente(cpf, pacienteDTO);
      return JSON.parse(JSON.stringify(paciente));
    }

}
