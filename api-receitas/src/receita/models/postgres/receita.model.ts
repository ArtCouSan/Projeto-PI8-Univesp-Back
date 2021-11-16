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
  
    @DeleteDateColumn()
    dtExclusao: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    status: string;

    @ManyToOne(type => Medico)
    @JoinColumn({name : 'medico_crm', referencedColumnName: 'crm'})
    medico: Medico;

    @ManyToOne(type => Paciente)
    @JoinColumn({name : 'paciente_cpf', referencedColumnName: 'cpf'})
    paciente: Paciente;

    @ManyToOne(type => Farmaceutico)
    @JoinColumn([
        {name : 'farmaceutico_crf', referencedColumnName: 'crf'},
        {name : 'farmaceutico_cnpjFarmacia', referencedColumnName: 'cnpjFarmacia'}
    ])
    farmaceutico: Farmaceutico;

}