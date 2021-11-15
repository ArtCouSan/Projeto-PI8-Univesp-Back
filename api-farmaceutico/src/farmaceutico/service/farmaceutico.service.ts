import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FarmaceuticoUpdateDTO } from '../dto/farmaceutico-update.dto';
import { FarmaceuticoDTO } from '../dto/farmaceutico.dto';
import { Farmaceutico } from '../models/farmaceutico.entity';
import { FarmaceuticoRepository } from '../repo/farmaceutico.repo';


@Injectable()
export class FarmaceuticoService {

    constructor(private readonly farmaceuticoRepo: FarmaceuticoRepository,
        private httpService: HttpService) { }

    public async criarFarmaceutico(farmaceuticoDTO: FarmaceuticoDTO) {

        const exist = await this.farmaceuticoRepo.findOne({
            where: {
                crf: farmaceuticoDTO.crf
            }
        });
        
        if(exist) {
            throw new BadRequestException("CRF existente");
        }

        const farmaceutico = new Farmaceutico();
        farmaceutico.crf = farmaceuticoDTO.crf;
        farmaceutico.nome = farmaceuticoDTO.nome;
        farmaceutico.status = "Ativo";
        farmaceutico.password = farmaceuticoDTO.password;
        // const farmacia = await firstValueFrom(this.httpService.get(`http://localhost:3000/api/v1/farmacia/${farmaceuticoDTO.cnpj}`));
        // farmaceutico.farmacia = farmacia.data;
        return this.farmaceuticoRepo.save(farmaceutico);
    }

    public pegarFarmaceutico = (crf: string) => {
        return this.farmaceuticoRepo.findOne({
            where: {
                crf: crf
            }
        });
    }

    public async atualizarFarmaceutico(crf: string, farmaceuticoDTO: FarmaceuticoUpdateDTO) {
        const farmaceutico = await this.farmaceuticoRepo.findOne({
            where: {
                crf: crf
            }
        });
        farmaceutico.nome = farmaceuticoDTO.nome;
        return this.farmaceuticoRepo.save(farmaceutico);
    }

    public async deletarFarmaceutico(crf: string) {
        const farmaceutico = await this.farmaceuticoRepo.findOne({
            where: {
                crf: crf
            }
        });
        farmaceutico.status = "Desativado";
        await this.farmaceuticoRepo.save(farmaceutico);
    }

    public listarFarmaceuticos = () => {
        return this.farmaceuticoRepo.find();
    }

}
