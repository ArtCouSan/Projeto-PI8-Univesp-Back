import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Receita } from "./receita.model";

@Entity()
export class Paciente extends BaseEntity {

    @PrimaryColumn()
    cpf: string;

    @Column({ nullable: false, type: 'varchar', length: 8 })
    password: string;
  
    @Column({ nullable: false, type: 'varchar', length: 20 })
    status: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    nome: string;

    @OneToMany(type => Receita, receita => receita.paciente, {eager: true})
    receitas: Receita[];

}