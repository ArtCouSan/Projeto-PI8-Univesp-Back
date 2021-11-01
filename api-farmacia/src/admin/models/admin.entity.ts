import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AdminFarmacia extends BaseEntity {

    @PrimaryColumn()
    cnpj: string;

    @Column({ nullable: false, type: 'varchar', length: 8 })
    password: string;
  
    @Column({ nullable: false, type: 'varchar', length: 20 })
    status: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    nome: string;

}