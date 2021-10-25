import { Injectable } from '@nestjs/common';
import { HospitalUpdateDTO } from '../dto/hospital-update.dto';
import { HospitalDTO } from '../dto/hospital.dto';
import { Hospital } from '../models/hospital.entity';
import { HospitalRepository } from '../repo/hospital.repo';

@Injectable()
export class HospitalService {

    constructor(private readonly hospitalRepo: HospitalRepository) { }

    public criarHospital = (hospitalDTO: HospitalDTO) => {
        const hospital = new Hospital();
        hospital.cnpj = hospitalDTO.cnpj;
        hospital.nomeFantasia = hospitalDTO.nomeFantasia;
        hospital.status = hospitalDTO.status;
        return this.hospitalRepo.save(hospital);
    }

    public async pegarHospital(cnpj: string) {
        return this.hospitalRepo.findOne({
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
        hospital.status = farmaciaDTO.status;
        return this.hospitalRepo.save(hospital);
    }

    public async deletarHospital(cnpj: string) {
        const hospital = await this.hospitalRepo.findOne({
            relations: ['medicos'],
            where: {
                cnpj: cnpj
            }
        });
        hospital.status = "Desativado";
        hospital.medicos.forEach(medico => {
            medico.status = "Desativado";
        });
        await this.hospitalRepo.save(hospital);
    }

    public listarHospitais = () => {
        return this.hospitalRepo.find();
    }

}
