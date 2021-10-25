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
        farmacia.nomeFantasia = farmaciaDTO.nomeFantasia;
        farmacia.status = "Ativo";
        return this.farmaciaRepo.save(farmacia);
    }

    public async pegarFarmacia(cnpj: string) {
        return this.farmaciaRepo.findOne({
            where: {
                cnpj: cnpj
            }
        });
    }

    public async atualizarFarmacia(cnpj: string, farmaciaDTO: FarmaciaUpdateDTO) {
        const farmacia = await this.farmaciaRepo.findOne({
            where: {
                cnpj: cnpj
            }
        });
        farmacia.nomeFantasia = farmaciaDTO.nomeFantasia;
        farmacia.status = farmaciaDTO.status;
        return this.farmaciaRepo.save(farmacia);
    }

    public async deletarFarmacia(cnpj: string) {
        const farmacia = await this.farmaciaRepo.findOne({
            relations: ['farmaceuticos'],
            where: {
                cnpj: cnpj
            }
        });
        farmacia.status = "Desativado";
        farmacia.farmaceuticos.forEach(farmaceutico => {
            farmaceutico.status = "Desativado";
        });
        await this.farmaciaRepo.save(farmacia);
    }

    public listarFarmacias = () => {
        return this.farmaciaRepo.find();
    }

}
