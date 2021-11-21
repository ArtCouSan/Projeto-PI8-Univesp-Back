/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as dayjs from 'dayjs'
import { ReceitaSaveDTO } from '../dto/receita-save.dto';
import { ReceitaRepository } from '../repo/receita.repo';
import { In, Like, Not } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Arquivo } from '../models/mongodb/arquivo.entity';
import { Paciente } from '../models/postgres/paciente.entity';
import { Medico } from '../models/postgres/medico.entity';
import { Receita } from '../models/postgres/receita.model';
import { Farmaceutico } from '../models/postgres/farmaceutico.entity';


@Injectable()
export class ReceitaService {

    constructor(private readonly receitaRepo: ReceitaRepository,
        private httpService: HttpService,
        @InjectModel('Arquivo') private readonly arquivoModel: Model<Arquivo>) { }

    public async salvarReceita(receitaDTO: ReceitaSaveDTO, file: Express.Multer.File) {
        const paciente: Paciente = await (await firstValueFrom(this.httpService.get(`http://localhost:3001/api/v1/paciente/${receitaDTO.cpfPaciente}`))).data;
        const medico: Medico = await (await firstValueFrom(this.httpService.get(`http://localhost:3005/api/v1/medico/${receitaDTO.crmMedico}/${receitaDTO.cnpjHospital}`))).data;
        let receita: Receita = new Receita();
        receita.status = "Em aberto";
        receita.medico = medico;
        receita.paciente = paciente;
        receita.hash = paciente.cpf.concat(medico.crm).concat(dayjs().format());
        const receitaSaved: Receita = await this.receitaRepo.save(receita);
        const arquivo: Arquivo = new Arquivo();
        arquivo.name = file.originalname;
        arquivo._id = receitaSaved.hash;
        arquivo.file = file.buffer.toString('base64');
        await new this.arquivoModel(arquivo).save();
        return receitaSaved;
    }

    public async buscarReceita(hash: string) {
        return await this.arquivoModel.findById(hash);
    }

    public async buscarReceitasPaciente(cpf: string) {
        return await this.receitaRepo.find({
            where: {
                paciente: cpf,
                status: Not("Receita cancelada")
            },
            order: {
                dtInsercao: "DESC"
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

    public async buscarReceitasMedico(crm: string, cnpjHospital: string, cpf: string) {
        return await this.receitaRepo.find({
            where: {
                medico: {
                    cnpjHospital: cnpjHospital,
                    crm: crm
                },
                status: Not("Receita cancelada"),
                paciente: Like(`%${cpf}%`)
            },
            order: {
                dtInsercao: "DESC"
            }
        });
    }

    public async cancelarReceitaPacienteComoMedico(crm: string, hash: string) {
        let receita = await this.receitaRepo.findOne({
            where: {
                hash: hash,
                status: "Em aberto"
            }
        });
        if (receita) {
            receita.status = "Receita cancelada";
            return await this.receitaRepo.save(receita);
        } else {
            throw new BadRequestException("Receita não pode ser cancelada, pois já está sendo utilizada!");
        }
    }

    public async buscarReceitasDoFarmaceutico(crf: string, cnpjFarmacia: string, cpf: string) {
        return await this.receitaRepo.find({
            where: {
                status: In(["Em analise", "Receita utilizada"]),
                paciente: Like(`%${cpf}%`),
                farmaceutico: {
                    cnpjFarmacia: cnpjFarmacia,
                    crf: crf
                }
            },
            order: {
                dtEmAnalise: "DESC"
            }
        });
    }

    public async buscarReceitasParaFarmaceutico(cpf: string) {
        return await this.receitaRepo.find({
            where: {
                status: "Em aberto",
                paciente: Like(`%${cpf}%`)
            },
            order: {
                dtInsercao: "DESC"
            }
        });
    }

    public async analisarReceitaPacienteComoFarmaceutico(crf: string, cnpjFarmacia: string, hash: string) {
        const farmaceutico: Farmaceutico = await (await firstValueFrom(this.httpService.get(`http://localhost:3004/api/v1/farmaceutico/${crf}/${cnpjFarmacia}`))).data;
        let receita = await this.receitaRepo.findOne({
            where: {
                hash: hash
            }
        }); 
        receita.dtEmAnalise = new Date();
        receita.status = "Em analise";
        receita.farmaceutico = farmaceutico;
        return await this.receitaRepo.save(receita);
    }

    public async devolverReceitaPacienteComoFarmaceutico(hash: string) {
        let receita = await this.receitaRepo.findOne({
            where: {
                hash: hash
            }
        });
        receita.dtFinalizado = null;
        receita.dtEmAnalise = null;
        receita.status = "Em aberto";
        receita.farmaceutico = null;
        return await this.receitaRepo.save(receita);
    }

    public async finalizarReceitaPacienteComoFarmaceutico(crf: string, cnpjFarmacia: string, hash: string) {
        let receita = await this.receitaRepo.findOne({
            where: {
                hash: hash
            }
        });
        receita.dtFinalizado = new Date();
        receita.status = "Receita utilizada";
        await this.receitaRepo.save(receita);
        return await this.receitaRepo.find({
            where: {
                status: In(["Em analise", "Receita utilizada"]),
                farmaceutico: {
                    cnpjFarmacia: cnpjFarmacia,
                    crf: crf
                }
            }
        });
    }

}
