import { AppDataSource } from "../data-source";
import { Rol } from "../entity/Rol";

const repo = () => AppDataSource.getRepository(Rol);

export const RolService = {
  create: async (data: Partial<Rol>) => {
    const entity = repo().create(data);
    return repo().save(entity);
  },
  findAll: async () => repo().find(),
  findOne: async (id: number) => repo().findOneBy({ id }),
  findByName: async (nombre: string) => repo().findOneBy({ nombre }),
  update: async (id: number, data: Partial<Rol>) => {
    await repo().update(id, data);
    return repo().findOneBy({ id });
  },
  delete: async (id: number) => {
    const res = await repo().delete(id);
    return res.affected && res.affected > 0;
  },
};
