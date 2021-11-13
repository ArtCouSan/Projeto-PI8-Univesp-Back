import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ReceitaSaveDTO } from './dto/receita-save.dto';
import { ReceitaService } from './service/receita.service';

@Controller('api/v1/receita')
export class ReceitaController {

    constructor(private receitaService: ReceitaService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFile(@Body() receitaDTO: ReceitaSaveDTO, @UploadedFile() file: Express.Multer.File) {
        await this.receitaService.salvarReceita(receitaDTO, file);
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

    @Get("/medico/:crm")
    async buscarReceitasMedico(@Param('crm') crm: string) {
      const receitas = await this.receitaService.buscarReceitasMedico(crm);
      return JSON.parse(JSON.stringify(receitas));
    }

    @Get("/farmaceutico/:crf")
    async buscarReceitasFarmaceutico(@Param('crf') crf: string) {
      const receitas = await this.receitaService.buscarReceitasFarmaceutico(crf);
      return JSON.parse(JSON.stringify(receitas));
    }

    @Get("/:hash/famarceutico/analisar/:crf")
    async analisarReceitaPacienteComoFarmaceuticorReceitasFarmaceutico(@Param('crf') crf: string, @Param('hash') hash: string) {
      const receita = await this.receitaService.analisarReceitaPacienteComoFarmaceutico(crf, hash);
      return JSON.parse(JSON.stringify(receita));
    }

    @Get("/:hash/famarceutico/devolver")
    async devolverReceitaPacienteComoFarmaceuticorReceitasFarmaceutico(@Param('hash') hash: string) {
      const receita = await this.receitaService.devolverReceitaPacienteComoFarmaceutico(hash);
      return JSON.parse(JSON.stringify(receita));
    }

    @Get("/:hash/famarceutico/finalizar")
    async finalizarReceitaPacienteComoFarmaceuticorReceitasFarmaceutico(@Param('hash') hash: string) {
      const receita = await this.receitaService.finalizarReceitaPacienteComoFarmaceutico(hash);
      return JSON.parse(JSON.stringify(receita));
    }

}
