
import { EntityRepository, Repository } from 'typeorm';
import { Medico } from '../models/medico.entity';

@EntityRepository(Medico)
export class MedicoRepository extends Repository<Medico> {
}