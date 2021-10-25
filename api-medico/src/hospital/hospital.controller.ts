import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HospitalUpdateDTO } from './dto/hospital-update.dto';
import { HospitalDTO } from './dto/hospital.dto';
import { HospitalService } from './service/hospital.service';

@Controller('api/v1/hospital')
export class HospitalController {
    
    constructor(private hospitalService: HospitalService){}

    @Post()
    async criarHospital(@Body() medicoDTO: HospitalDTO) {
      const hospital = await this.hospitalService.criarHospital(medicoDTO);
      return JSON.parse(JSON.stringify(hospital));
    }
  
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
  
    @Delete(":cnpj")
    async deletarHospital(@Param('cnpj') cnpj: string) {
      await this.hospitalService.deletarHospital(cnpj);
      return JSON.parse(JSON.stringify('{"message":"Deletado com sucesso"}'));
    }
  
    @Put(":cnpj")
    async atualizarHospital(@Param('cnpj') cnpj: string, @Body() hospitalDTO: HospitalUpdateDTO) {
      const hospital = await this.hospitalService.atualizarHospital(cnpj, hospitalDTO);
      return JSON.parse(JSON.stringify(hospital));
    }


}
