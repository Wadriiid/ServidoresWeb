import { AppDataSource } from "../data-source";
import { Cliente } from "../entity/Cliente";

export class ClienteService {
  private repo = AppDataSource.getRepository(Cliente);

  async create(data: Partial<Cliente>) {
    const cliente = this.repo.create(data);
    return await this.repo.save(cliente);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<Cliente>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
