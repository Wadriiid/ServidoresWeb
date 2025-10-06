import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ConfiguracionSistema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  clave!: string;

  @Column("text")
  valor!: string;

  @Column({ nullable: true })
  descripcion?: string;
}
