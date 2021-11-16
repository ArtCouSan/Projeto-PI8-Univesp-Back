import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { MedicoUpdateDTO } from '../dto/medico-update.dto';
import { MedicoDTO } from '../dto/medico.dto';
import { Hospital } from '../models/hospital.entity';
import { Medico } from '../models/medico.entity';
import { MedicoRepository } from '../repo/medico.repo';


@Injectable()
export class MedicoService {

    constructor(private readonly medicoRepo: MedicoRepository,
        private httpService: HttpService) { }

    public async criarMedico(medicoDTO: MedicoDTO) {

        const hospital: Hospital = await (await firstValueFrom(this.httpService.get(`http://localhost:3007/api/v1/hospital/${medicoDTO.cnpjHospital}`))).data;

        const exist = await this.medicoRepo.findOne({
            where: {
                crm: medicoDTO.crm,
                cnpjHospital: medicoDTO.cnpjHospital
            }
        });

        if (exist) {
            throw new BadRequestException("CRM existente");
        }

        const medico = new Medico();
        medico.cnpjHospital = hospital.cnpj;
        medico.crm = medicoDTO.crm;
        medico.nome = medicoDTO.nome;
        medico.password = medicoDTO.password;
        medico.status = "Ativo";
        medico.hospital = hospital;
        return this.medicoRepo.save(medico);
    }

    public async pegarMedico(crm: string, cnpjHospital: string) {
        return await this.medicoRepo.findOne({
            where: {
                crm: crm,
                cnpjHospital: cnpjHospital
            }
        });
    }

    public async atualizarMedico(crm: string, cnpjHospital: string, madicoDTO: MedicoUpdateDTO) {
        const medico = await this.medicoRepo.findOne({
            where: {
                crm: crm,
                cnpjHospital: cnpjHospital
            }
        });
        medico.nome = madicoDTO.nome;
        return this.medicoRepo.save(medico);
    }

    public async deletarMedico(crm: string, cnpjHospital: string) {
        const medico = await this.medicoRepo.findOne({
            where: {
                crm: crm,
                cnpjHospital: cnpjHospital
            }
        });
        medico.status = "Desativado";
        await this.medicoRepo.save(medico);
    }

    public listarMedicos = () => {
        return this.medicoRepo.find();
    }

    public listarMedicosPeloCRM = (crm: string) => {
        return this.medicoRepo.find({
            where: {
                crm: crm
            }
        });
    }

}
