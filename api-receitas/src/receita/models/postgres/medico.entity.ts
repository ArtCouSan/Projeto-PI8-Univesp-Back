import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Hospital } from "./hospital.entity";
import { Receita } from "./receita.model";

@Entity()
export class Medico extends BaseEntity {

  @PrimaryColumn()
  crm: string;

  @PrimaryColumn()
  cnpjHospital: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 8 })
  password: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

  @OneToMany(type => Receita, receita => receita.medico, {eager: false})
  receitas: Receita[];
  
  @ManyToOne(type => Hospital, {eager: true})
  @JoinColumn({name : 'hospital_cnpj', referencedColumnName: 'cnpj'})
  hospital: Hospital;

}
