
import { EntityRepository, Repository } from 'typeorm';
import { Receita } from '../models/receita.model';

@EntityRepository(Receita)
export class ReceitaRepository extends Repository<Receita> {
}