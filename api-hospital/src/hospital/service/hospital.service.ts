import { BadRequestException, Injectable } from '@nestjs/common';
import { HospitalUpdateDTO } from '../dto/hospital-update.dto';
import { HospitalDTO } from '../dto/hospital.dto';
import { Hospital } from '../models/hospital.entity';
import { HospitalRepository } from '../repo/hospital.repo';

@Injectable()
export class HospitalService {

    constructor(private readonly hospitalRepo: HospitalRepository) { }

    public async criarHospital(hospitalDTO: HospitalDTO) {
        const hospital = new Hospital();

        const exist = await this.hospitalRepo.findOne({
            where: {
                cnpj: hospitalDTO.cnpj
            }
        });
        
        if(exist) {
            throw new BadRequestException("CNPJ existente");
        }

        hospital.cnpj = hospitalDTO.cnpj;
        hospital.nomeFantasia = hospitalDTO.nomeFantasia;
        hospital.password = hospitalDTO.password;
        hospital.status = "Ativo";
        return this.hospitalRepo.save(hospital);
    }

    public async pegarHospital(cnpj: string) {
        return await this.hospitalRepo.findOne({
            where: {
                cnpj: cnpj
            }
        });
    }

    public async atualizarHospital(cnpj: string, farmaciaDTO: HospitalUpdateDTO) {
        const hospital = await this.hospitalRepo.findOne({
            where: {
                cnpj: cnpj
            }
        });
        hospital.nomeFantasia = farmaciaDTO.nomeFantasia;
        return this.hospitalRepo.save(hospital);
    }

    public async deletarHospital(cnpj: string) {
        const hospital = await this.hospitalRepo.findOne({
            where: {
                cnpj: cnpj
            }
        });
        hospital.status = "Desativado";
        await this.hospitalRepo.save(hospital);
    }

    public listarHospitais = () => {
        return this.hospitalRepo.find();
    }

}
