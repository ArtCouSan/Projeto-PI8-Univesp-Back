import { Injectable } from '@nestjs/common';
import { FarmaciaUpdateDTO } from '../dto/farmacia-update.dto';
import { FarmaciaDTO } from '../dto/farmacia.dto';
import { Farmacia } from '../models/farmacia.entity';
import { FarmaciaRepository } from '../repo/farmacia.repo';

@Injectable()
export class FarmaciaService {

    constructor(private readonly farmaciaRepo: FarmaciaRepository) { }

    public criarFarmacia = (farmaciaDTO: FarmaciaDTO) => {
        const farmacia = new Farmacia();
        farmacia.cnpj = farmaciaDTO.cnpj;
        farmacia.nomeFilial = farmaciaDTO.nomeFilial;
        farmacia.status = "Ativo";
        return this.farmaciaRepo.save(farmacia);
    }

    public async pegarFarmacia(id: string) {
        return await this.farmaciaRepo.findOne({
            where: {
                id : id
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

    public async listarFarmacias(cnpj: string) {
        return await this.farmaciaRepo.find({
            where: {
                cnpj: cnpj
            }
        });
    }
}
