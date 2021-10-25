import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Medico } from "./medico.entity";

@Entity()
export class Hospital extends BaseEntity {

  @PrimaryColumn()
  cnpj: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nomeFantasia: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

  @OneToMany(type => Medico, medico => medico.hospital, { onUpdate: "CASCADE", cascade: true })
  medicos: Medico[];
}
