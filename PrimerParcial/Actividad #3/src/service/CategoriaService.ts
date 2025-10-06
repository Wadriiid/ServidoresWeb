import { AppDataSource } from "../data-source";
import { Categoria } from "../entity/Categoria";

const repo = () => AppDataSource.getRepository(Categoria);

export const CategoriaService = {
  create: async (data: Partial<Categoria>) => {
    const entity = repo().create(data);
    return repo().save(entity);
  },
  findAll: async () => repo().find(),
  findOne: async (id: number) => repo().findOneBy({ id }),
  findByName: async (nombre: string) => repo().findOneBy({ nombre }),
  update: async (id: number, data: Partial<Categoria>) => {
    await repo().update(id, data);
    return repo().findOneBy({ id });
  },
  delete: async (id: number) => {
    const res = await repo().delete(id);
    return res.affected && res.affected > 0;
  },
};
