import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Not } from 'typeorm';
import { FarmaceuticoUpdateDTO } from '../dto/farmaceutico-update.dto';
import { FarmaceuticoDTO } from '../dto/farmaceutico.dto';
import { Farmaceutico } from '../models/farmaceutico.entity';
import { Farmacia } from '../models/farmacia.entity';
import { FarmaceuticoRepository } from '../repo/farmaceutico.repo';


@Injectable()
export class FarmaceuticoService {

    constructor(private readonly farmaceuticoRepo: FarmaceuticoRepository,
        private httpService: HttpService) { }

    public async criarFarmaceutico(farmaceuticoDTO: FarmaceuticoDTO) {

        const farmacia: Farmacia = await (await firstValueFrom(this.httpService.get(`http://localhost:3000/api/v1/farmacia/${farmaceuticoDTO.cnpjFarmacia}`))).data;

        const exist = await this.farmaceuticoRepo.findOne({
            where: {
                crf: farmaceuticoDTO.crf,
                cnpjFarmacia: farmaceuticoDTO.cnpjFarmacia
            }
        });
        
        if(exist) {
            throw new BadRequestException(`CRF existente no CNPJ`);
        }

        const farmaceutico = new Farmaceutico();
        farmaceutico.cnpjFarmacia = farmacia.cnpj;
        farmaceutico.crf = farmaceuticoDTO.crf;
        farmaceutico.nome = farmaceuticoDTO.nome;
        farmaceutico.status = "Ativo";
        farmaceutico.password = farmaceuticoDTO.password;
        farmaceutico.farmacia = farmacia;
        return this.farmaceuticoRepo.save(farmaceutico);
    }

    public pegarFarmaceutico = (crf: string, cnpjFarmacia: string) => {
        return this.farmaceuticoRepo.findOne({
            where: {
                crf: crf,
                cnpjFarmacia: cnpjFarmacia
            }
        });
    }

    public async atualizarFarmaceutico(crf: string, cnpjFarmacia: string, farmaceuticoDTO: FarmaceuticoUpdateDTO) {
        const farmaceutico = await this.farmaceuticoRepo.findOne({
            where: {
                crf: crf,
                cnpjFarmacia: cnpjFarmacia
            }
        });
        farmaceutico.nome = farmaceuticoDTO.nome;
        return this.farmaceuticoRepo.save(farmaceutico);
    }

    public async deletarFarmaceutico(crf: string, cnpjFarmacia: string) {
        const farmaceutico = await this.farmaceuticoRepo.findOne({
            where: {
                crf: crf,
                cnpjFarmacia: cnpjFarmacia
            }
        });
        farmaceutico.status = "Desativado";
        await this.farmaceuticoRepo.save(farmaceutico);
    }

    public listarFarmaceuticos = () => {
        return this.farmaceuticoRepo.find();
    }

    public listarFarmaceuticosPeloCRF = (crf: string) => {
        return this.farmaceuticoRepo.find({
            where: {
                crf: crf
            }
        });
    }

}
