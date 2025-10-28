import { DispositivosService } from './dispositivos.service';
import { CreateDispositivoDto } from './dto/create-dispositivo.dto';
import { UpdateDispositivoDto } from './dto/update-dispositivo.dto';
export declare class DispositivosController {
    private readonly dispositivosService;
    constructor(dispositivosService: DispositivosService);
    create(createDispositivoDto: CreateDispositivoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDispositivoDto: UpdateDispositivoDto): string;
    remove(id: string): string;
}
