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
        medico.status = "Ativo";
        return this.medicoRepo.save(medico);
    }

    public async pegarMedico(crm: string) {
        return await this.medicoRepo.findOne({
            where: {
                crm: crm
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
