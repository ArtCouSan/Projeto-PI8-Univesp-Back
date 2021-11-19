/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Header, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { createReadStream, writeFileSync } from 'fs';
import { Readable } from 'stream';
import { ReceitaMedicoFiltroDTO } from './dto/receita-medico-filtro.dto';
import { ReceitaSaveDTO } from './dto/receita-save.dto';
import { ReceitaService } from './service/receita.service';
global.atob = require("atob");

@Controller('api/v1/receita')
export class ReceitaController {

  constructor(private receitaService: ReceitaService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@Body() receitaDTO: ReceitaSaveDTO, @UploadedFile() file: Express.Multer.File) {
    const receita = await this.receitaService.salvarReceita(receitaDTO, file);
    return JSON.parse(JSON.stringify(receita));
  }

  @Get('/download/:hash')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'inline; filename=file.pdf')
  public async downloadFile(@Param('hash') hash: string, @Res() res) {
    const receita = await this.receitaService.buscarReceita(hash);
    let buff = Buffer.from(receita.file, 'base64');
    res.setHeader('Content-disposition', 'attachment; filename=' + receita.name);
    res.end(buff);
  }

  @Get("/paciente/:cpf")
  async buscarReceitasPaciente(@Param('cpf') cpf: string) {
    const receitas = await this.receitaService.buscarReceitasPaciente(cpf);
    return JSON.parse(JSON.stringify(receitas));
  }

  @Get("/paciente/:cpf/:id")
  async buscarReceitaPaciente(@Param('cpf') cpf: string, @Param('id') id: string) {
    const receita = await this.receitaService.buscarReceitaPaciente(cpf, id);
    return JSON.parse(JSON.stringify(receita));
  }

  @Post("/medico/:crm/:cnpj")
  async buscarReceitasMedico(@Param('crm') crm: string, @Param('cnpj') cnpj: string, @Body() filtroDTO: ReceitaMedicoFiltroDTO) {
    const receitas = await this.receitaService.buscarReceitasMedico(crm, cnpj, filtroDTO.cpfFiltrado);
    return JSON.parse(JSON.stringify(receitas));
  }

  @Delete("/:hash/medico/:crm")
  async cancelarReceitaPacienteComoMedico(@Param('crm') crm: string, @Param('hash') hash: string) {
    const receita = await this.receitaService.cancelarReceitaPacienteComoMedico(crm, hash);
    return JSON.parse(JSON.stringify(receita));
  }

  @Post("/farmaceutico/:crf/:cnpj")
  async buscarReceitasDoFarmaceutico(@Param('crf') crf: string, @Param('cnpj') cnpj: string, @Body() filtroDTO: ReceitaMedicoFiltroDTO) {
    const receitas = await this.receitaService.buscarReceitasDoFarmaceutico(crf, cnpj, filtroDTO.cpfFiltrado);
    return JSON.parse(JSON.stringify(receitas));
  }

  @Post("/farmaceutico")
  async buscarReceitasParaFarmaceutico(@Body() filtroDTO: ReceitaMedicoFiltroDTO) {
    const receitas = await this.receitaService.buscarReceitasParaFarmaceutico(filtroDTO.cpfFiltrado);
    return JSON.parse(JSON.stringify(receitas));
  }

  @Get("/:hash/farmaceutico/analisar/:crf/:cnpj")
  async analisarReceitaPacienteComoFarmaceuticorReceitasFarmaceutico(@Param('crf') crf: string, @Param('cnpj') cnpj: string, @Param('hash') hash: string) {
    const receita = await this.receitaService.analisarReceitaPacienteComoFarmaceutico(crf, cnpj, hash);
    return JSON.parse(JSON.stringify(receita));
  }

  @Get("/:hash/farmaceutico/devolver")
  async devolverReceitaPacienteComoFarmaceuticorReceitasFarmaceutico(@Param('hash') hash: string) {
    const receita = await this.receitaService.devolverReceitaPacienteComoFarmaceutico(hash);
    return JSON.parse(JSON.stringify(receita));
  }

  @Get("/:hash/farmaceutico/finalizar/:crf/:cnpj")
  async finalizarReceitaPacienteComoFarmaceuticorReceitasFarmaceutico(@Param('crf') crf: string, @Param('cnpj') cnpj: string, @Param('hash') hash: string) {
    const receita = await this.receitaService.finalizarReceitaPacienteComoFarmaceutico(crf, cnpj, hash);
    return JSON.parse(JSON.stringify(receita));
  }

}

