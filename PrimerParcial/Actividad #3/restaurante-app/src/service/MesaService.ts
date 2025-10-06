import { AppDataSource } from "../data-source";
import { Mesa } from "../entity/Mesa";

export class MesaService {
  private repo = AppDataSource.getRepository(Mesa);

  async create(data: Partial<Mesa>) {
    const mesa = this.repo.create(data);
    return await this.repo.save(mesa);
  }

  async findAll() {
    return await this.repo.find({ relations: ["restaurante"] });
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ["restaurante"] });
  }

  async update(id: number, data: Partial<Mesa>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
