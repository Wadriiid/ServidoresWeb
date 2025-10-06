import "reflect-metadata";
import { DataSource } from "typeorm";
import { Restaurante } from "./entity/Restaurante";
import { Mesa } from "./entity/Mesa";
import { Cliente } from "./entity/Cliente";
import { Menu } from "./entity/Menu";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "restaurante.db",
  synchronize: true,
  logging: false,
  entities: [Restaurante, Mesa, Cliente, Menu],
});
