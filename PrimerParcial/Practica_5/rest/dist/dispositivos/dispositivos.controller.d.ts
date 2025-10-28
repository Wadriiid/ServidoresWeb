import { DispositivosService } from './dispositivos.service';
export declare class DispositivosController {
    private readonly dispositivosService;
    constructor(dispositivosService: DispositivosService);
    findAll(): {
        id: string;
        nombre: string;
        tipo: string;
    }[];
    findOne(id: string): {
        id: string;
        nombre: string;
        tipo: string;
    } | undefined;
}
