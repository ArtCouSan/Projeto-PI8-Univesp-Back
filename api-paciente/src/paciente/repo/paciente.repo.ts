
import { EntityRepository, Repository } from 'typeorm';
import { Paciente } from '../models/paciente.entity';

@EntityRepository(Paciente)
export class PacienteRepository extends Repository<Paciente> {
}