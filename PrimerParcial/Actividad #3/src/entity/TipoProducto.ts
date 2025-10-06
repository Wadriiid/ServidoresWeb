import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Categoria } from "./Categoria";

@Entity()
export class TipoProducto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ default: true })
  activo!: boolean;

  @ManyToOne(() => Categoria, { nullable: true })
  @JoinColumn()
  categoria?: Categoria;
}
