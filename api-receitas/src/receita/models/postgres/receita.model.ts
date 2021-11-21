import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Farmaceutico } from "./farmaceutico.entity";
import { Medico } from "./medico.entity";
import { Paciente } from "./paciente.entity";

@Entity()
export class Receita extends BaseEntity {

    @PrimaryColumn()
    hash: string;

    @CreateDateColumn()
    dtInsercao: Date;

    @Column({ nullable: true, type: 'date' })
    dtEmAnalise: Date;

    @Column({ nullable: true, type: 'date' })
    dtFinalizado: Date;

    @DeleteDateColumn()
    dtExclusao: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    status: string;

    @ManyToOne(type => Medico, {eager: true})
    @JoinColumn([
        { name: 'medico_crm', referencedColumnName: 'crm' },
        { name: 'medico_cnpjHospital', referencedColumnName: 'cnpjHospital' }
    ])
    medico: Medico;

    @ManyToOne(type => Paciente, {eager: true})
    @JoinColumn({ name: 'paciente_cpf', referencedColumnName: 'cpf' })
    paciente: Paciente;

    @ManyToOne(type => Farmaceutico, {eager: true})
    @JoinColumn([
        { name: 'farmaceutico_crf', referencedColumnName: 'crf' },
        { name: 'farmaceutico_cnpjFarmacia', referencedColumnName: 'cnpjFarmacia' }
    ])
    farmaceutico: Farmaceutico;

}