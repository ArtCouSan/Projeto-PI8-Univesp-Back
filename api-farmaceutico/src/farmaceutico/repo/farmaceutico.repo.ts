
import { EntityRepository, Repository } from 'typeorm';
import { Farmaceutico } from '../models/farmaceutico.entity';

@EntityRepository(Farmaceutico)
export class FarmaceuticoRepository extends Repository<Farmaceutico> {
}