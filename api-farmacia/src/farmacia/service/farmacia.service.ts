import { BadRequestException, Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { FarmaciaUpdateDTO } from '../dto/farmacia-update.dto';
import { FarmaciaDTO } from '../dto/farmacia.dto';
import { Farmacia } from '../models/farmacia.entity';
import { FarmaciaRepository } from '../repo/farmacia.repo';

@Injectable()
export class FarmaciaService {

    constructor(private readonly farmaciaRepo: FarmaciaRepository) { }

    public async criarFarmacia(farmaciaDTO: FarmaciaDTO) {
        const farmacia = new Farmacia();

        const exist = await this.farmaciaRepo.findOne({
            where: {
                cnpj: farmaciaDTO.cnpj
            }
        });
        
        if(exist) {
            throw new BadRequestException("CNPJ existente");
        }

        farmacia.cnpj = farmaciaDTO.cnpj;
        farmacia.nomeFilial = farmaciaDTO.nomeFilial;
        farmacia.password = farmaciaDTO.password;
        farmacia.status = "Ativo";
        return this.farmaciaRepo.save(farmacia);
    }

    public async pegarFarmacia(cnpj: string) {
        return await this.farmaciaRepo.findOne({
            where: {
                cnpj : cnpj
            }
        });
    }

    public async atualizarFarmacia(id: string, farmaciaDTO: FarmaciaUpdateDTO) {
        const farmacia = await this.farmaciaRepo.findOne({
            where: {
                id: id
            }
        });
        farmacia.nomeFilial = farmaciaDTO.nomeFilial;
        return this.farmaciaRepo.save(farmacia);
    }

    public async deletarFarmacia(id: string) {
        const farmacia = await this.farmaciaRepo.findOne({
            where: {
                id: id
            }
        });
        farmacia.status = "Desativado";
        await this.farmaciaRepo.save(farmacia);
    }

    public async listarFarmacias() {
        return await this.farmaciaRepo.find();
    }
}
