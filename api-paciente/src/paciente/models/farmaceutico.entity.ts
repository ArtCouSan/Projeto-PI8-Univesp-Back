import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Receita } from "./receita.model";

@Entity()
export class Farmaceutico extends BaseEntity {

  @PrimaryColumn()
  crf: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  password: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

  @OneToMany(type => Receita, receita => receita.farmaceutico, {eager: true})
  receitas: Receita[];

}
