import { CreateDispositivoDto } from './dto/create-dispositivo.dto';
import { UpdateDispositivoDto } from './dto/update-dispositivo.dto';
export declare class DispositivosService {
    create(createDispositivoDto: CreateDispositivoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDispositivoDto: UpdateDispositivoDto): string;
    remove(id: number): string;
}
