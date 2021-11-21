import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Farmaceutico } from "./farmaceutico.entity";

@Entity()
export class Farmacia extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  cnpj: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  password: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nomeFilial: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

  @OneToMany(type => Farmaceutico, farmaceutico => farmaceutico.farmacia, {eager: false})
  farmaceuticos: Farmaceutico[];

}
