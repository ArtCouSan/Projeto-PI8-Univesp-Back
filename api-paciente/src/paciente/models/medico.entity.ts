import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Receita } from "./receita.model";

@Entity()
export class Medico extends BaseEntity {

  @PrimaryColumn()
  crm: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 8 })
  password: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

  @OneToMany(type => Receita, receita => receita.medico, {eager: true})
  receitas: Receita[];

}
