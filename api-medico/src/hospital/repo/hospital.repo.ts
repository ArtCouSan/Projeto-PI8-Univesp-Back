
import { EntityRepository, Repository } from 'typeorm';
import { Hospital } from '../models/hospital.entity';

@EntityRepository(Hospital)
export class HospitalRepository extends Repository<Hospital> {
}