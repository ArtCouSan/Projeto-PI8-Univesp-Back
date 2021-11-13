import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as dayjs from 'dayjs'
import { ReceitaSaveDTO } from '../dto/receita-save.dto';
import { Receita } from '../models/receita.model';
import { ReceitaRepository } from '../repo/receita.repo';
import { Paciente } from '../models/paciente.entity';
import { Medico } from '../models/medico.entity';
import { Farmaceutico } from '../models/farmaceutico.entity';


@Injectable()
export class ReceitaService {

    constructor(private readonly receitaRepo: ReceitaRepository,
        private httpService: HttpService) { }

    public async salvarReceita(receitaDTO: ReceitaSaveDTO, @UploadedFile() file: Express.Multer.File) {
        const paciente: Paciente = await (await firstValueFrom(this.httpService.get(`http://localhost:3001/api/v1/paciente/${receitaDTO.cpfPaciente}`))).data;
        const medico: Medico = await (await firstValueFrom(this.httpService.get(`http://localhost:3005/api/v1/medico/${receitaDTO.crmMedico}`))).data;
        let receita: Receita = new Receita();
        receita.status = "Ativo";
        receita.medico = medico;
        receita.paciente = paciente;
        receita.hash = paciente.cpf.concat(medico.crm).concat(dayjs().format());
        this.receitaRepo.save(receita);
    }

    public async buscarReceitasPaciente(cpf: string) {
        return await this.receitaRepo.find({
            where: {
                paciente: cpf
            }
        });
    }

    public async buscarReceitaPaciente(cpf: string, id: string) {
        return await this.receitaRepo.find({
            where: {
                paciente: cpf,
                hash: id
            }
        });
    }

    public async buscarReceitasMedico(crm: string) {
        return await this.receitaRepo.find({
            where: {
                medico: crm
            }
        });
    }

    public async buscarReceitasFarmaceutico(crf: string) {
        return await this.receitaRepo.find({
            where: {
                farmaceutico: crf
            }
        });
    }

    public async analisarReceitaPacienteComoFarmaceutico(crf: string, hash: string) {
        const farmaceutico: Farmaceutico = await (await firstValueFrom(this.httpService.get(`http://localhost:3004/api/v1/farmaceutico/${crf}`))).data;
        let receita = await this.receitaRepo.findOne({
            where: {
                hash: hash
            }
        });
        receita.status = "Analise";
        receita.farmaceutico = farmaceutico;
        return await this.receitaRepo.save(receita);
    }

    public async devolverReceitaPacienteComoFarmaceutico(hash: string) {
        let receita = await this.receitaRepo.findOne({
            where: {
                hash: hash
            }
        });
        receita.status = "Ativo";
        receita.farmaceutico = null;
        return await this.receitaRepo.save(receita);
    }

    public async finalizarReceitaPacienteComoFarmaceutico(hash: string) {
        let receita = await this.receitaRepo.findOne({
            where: {
                hash: hash
            }
        });
        receita.status = "Finalizado";
        return await this.receitaRepo.save(receita);
    }

}
