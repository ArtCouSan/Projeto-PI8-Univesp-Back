
import { EntityRepository, Repository } from 'typeorm';
import { Receita } from '../models/postgres/receita.model';

@EntityRepository(Receita)
export class ReceitaRepository extends Repository<Receita> {
}