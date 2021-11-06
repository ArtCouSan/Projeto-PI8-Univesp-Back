import { Request, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PacienteUpdateDTO } from './dto/paciente-update.dto';
import { PacienteDTO } from './dto/paciente.dto';
import { PacienteService } from './service/paciente.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/paciente')
export class PacienteController {

    constructor(private pacienteService: PacienteService, private readonly authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

    @Post()
    async criarPaciente(@Body() pacienteDTO: PacienteDTO) {
      const paciente = await this.pacienteService.criarPaciente(pacienteDTO);
      return JSON.parse(JSON.stringify(paciente));
    }
  
    @UseGuards(JwtAuthGuard)
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
  
    @UseGuards(JwtAuthGuard)
    @Delete(":cpf")
    async deletarPaciente(@Param('cpf') cpf: string) {
      await this.pacienteService.deletarPaciente(cpf);
      return JSON.parse(JSON.stringify('{"message":"Deletado com sucesso"}'));
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(":cpf")
    async atualizarPaciente(@Param('cpf') cpf: string, @Body() pacienteDTO: PacienteUpdateDTO) {
      const paciente = await this.pacienteService.atualizarPaciente(cpf, pacienteDTO);
      return JSON.parse(JSON.stringify(paciente));
    }

}
