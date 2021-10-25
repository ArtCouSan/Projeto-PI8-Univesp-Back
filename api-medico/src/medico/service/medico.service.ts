import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { MedicoUpdateDTO } from '../dto/medico-update.dto';
import { MedicoDTO } from '../dto/medico.dto';
import { Medico } from '../models/medico.entity';
import { MedicoRepository } from '../repo/medico.repo';


@Injectable()
export class MedicoService {

    constructor(private readonly medicoRepo: MedicoRepository) { }

    public async criarMedico(medicoDTO: MedicoDTO) {
        const medico = new Medico();
        medico.crm = medicoDTO.crm;
        medico.nome = medicoDTO.nome;
        medico.status = medicoDTO.status;
        return this.medicoRepo.save(medico);
    }

    public pegarMedico = (crf: string) => {
        return this.medicoRepo.find({
            where: {
                crf: crf
            }
        });
    }

    public async atualizarMedico(crm: string, madicoDTO: MedicoUpdateDTO) {
        const medico = await this.medicoRepo.findOne({
            where: {
                crm: crm
            }
        });
        medico.nome = madicoDTO.nome;
        medico.status = madicoDTO.status;
        return this.medicoRepo.save(medico);
    }

    public async deletarMedico(crm: string) {
        const medico = await this.medicoRepo.findOne({
            where: {
                crm: crm
            }
        });
        medico.status = "Desativado";
        await this.medicoRepo.save(medico);
    }

    public listarMedicos = () => {
        return this.medicoRepo.find();
    }

}
