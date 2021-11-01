import { Injectable } from '@nestjs/common';
import { PacienteUpdateDTO } from '../dto/paciente-update.dto';
import { PacienteDTO } from '../dto/paciente.dto';
import { Paciente } from '../models/paciente.entity';
import { PacienteRepository } from '../repo/paciente.repo';

@Injectable()
export class PacienteService {

    constructor(private readonly pacienteRepo: PacienteRepository) { }

    public criarPaciente = (pacienteDTO: PacienteDTO) => {
        const paciente = new Paciente();
        paciente.cpf = pacienteDTO.cpf;
        paciente.nome = pacienteDTO.nome;
        paciente.status = "Ativo";
        return this.pacienteRepo.save(paciente);
    }

    public async pegarPaciente(cpf: string) {
        return await this.pacienteRepo.findOne({
            where: {
                cpf: cpf
            }
        });
    }

    public async atualizarPaciente(cpf: string, pacienteDTO: PacienteUpdateDTO) {
        const paciente = await this.pacienteRepo.findOne({
            where: {
                cpf: cpf
            }
        });
        paciente.nome = pacienteDTO.nome;
        paciente.status = pacienteDTO.status;
        return this.pacienteRepo.save(paciente);
    }

    public async deletarPaciente(cpf: string) {
        const paciente = await this.pacienteRepo.findOne({
            where: {
                cpf: cpf
            }
        });
        paciente.status = "Desativado";
        await this.pacienteRepo.save(paciente);
    }

    public listarPacientes = () => {
        return this.pacienteRepo.find();
    }

}
