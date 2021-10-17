
import { EntityRepository, Repository } from 'typeorm';
import { Farmacia } from '../models/farmacia.entity';

@EntityRepository(Farmacia)
export class FarmaciaRepository extends Repository<Farmacia> {
}