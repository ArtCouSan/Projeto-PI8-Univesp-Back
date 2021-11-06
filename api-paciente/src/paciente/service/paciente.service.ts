import { BadRequestException, Injectable } from '@nestjs/common';
import { PacienteUpdateDTO } from '../dto/paciente-update.dto';
import { PacienteDTO } from '../dto/paciente.dto';
import { Paciente } from '../models/paciente.entity';
import { PacienteRepository } from '../repo/paciente.repo';

@Injectable()
export class PacienteService {

    constructor(private readonly pacienteRepo: PacienteRepository) { }

    public async criarPaciente(pacienteDTO: PacienteDTO){
        const paciente = new Paciente();

        const exist = await this.pacienteRepo.findOne({
            where: {
                cpf: pacienteDTO.cpf
            }
        });
        
        if(exist) {
            throw new BadRequestException("CPF existente");
        }

        paciente.cpf = pacienteDTO.cpf;
        paciente.nome = pacienteDTO.nome;
        paciente.password = pacienteDTO.password;
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
