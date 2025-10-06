import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Restaurante } from "./Restaurante";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @Column()
  precio!: number;

  @ManyToOne(() => Restaurante, (restaurante) => restaurante.menus)
  restaurante!: Restaurante;
}
