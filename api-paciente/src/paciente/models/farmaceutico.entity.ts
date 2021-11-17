import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Farmacia } from "./farmacia.entity";
import { Receita } from "./receita.model";

@Entity()
export class Farmaceutico extends BaseEntity {

  @PrimaryColumn()
  crf: string;

  @PrimaryColumn()
  cnpjFarmacia: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  password: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

  @OneToMany(type => Receita, receita => receita.farmaceutico, {eager: false})
  receitas: Receita[];

  @ManyToOne(type => Farmacia, {eager: false})
  @JoinColumn({name : 'farmacia_id', referencedColumnName: 'id'})
  farmacia: Farmacia;

}
