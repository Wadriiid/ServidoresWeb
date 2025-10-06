import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Mesa } from "./Mesa";
import { Menu } from "./Menu";

@Entity()
export class Restaurante {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  direccion!: string;

  @Column()
  telefono!: string;

  @OneToMany(() => Mesa, (mesa) => mesa.restaurante)
  mesas!: Mesa[];

  @OneToMany(() => Menu, (menu) => menu.restaurante)
  menus!: Menu[];
}
