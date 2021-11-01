import { Injectable } from '@nestjs/common';
import { AdminDTO } from '../dto/admin.dto';
import { AdminFarmacia } from '../models/admin.entity';
import { AdminRepository } from '../repo/admin.repo';

@Injectable()
export class AdminService {

    constructor(private readonly adminRepo: AdminRepository) { }

    public criarAdmin = (adminDTO: AdminDTO) => {
        const admin = new AdminFarmacia();
        admin.cnpj = adminDTO.cnpj;
        admin.nome = adminDTO.nome;
        admin.password = adminDTO.password;
        admin.status = "Ativo";
        return this.adminRepo.save(admin);
    }

    public async pegarAdmin(cnpj: string) {
        const admin = await this.adminRepo.findOne({
            where: {
                cnpj: cnpj
            }
        });
        return admin;
    }

    // public async atualizarPaciente(cpf: string, pacienteDTO: PacienteUpdateDTO) {
    //     const paciente = await this.pacienteRepo.findOne({
    //         where: {
    //             cpf: cpf
    //         }
    //     });
    //     paciente.nome = pacienteDTO.nome;
    //     paciente.status = pacienteDTO.status;
    //     return this.pacienteRepo.save(paciente);
    // }

    // public async deletarPaciente(cpf: string) {
    //     const paciente = await this.pacienteRepo.findOne({
    //         where: {
    //             cpf: cpf
    //         }
    //     });
    //     paciente.status = "Desativado";
    //     await this.pacienteRepo.save(paciente);
    // }

    // public listarPacientes = () => {
    //     return this.pacienteRepo.find();
    // }

}
