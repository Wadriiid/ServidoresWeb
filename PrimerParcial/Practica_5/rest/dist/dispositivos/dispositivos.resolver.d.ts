import { DispositivosService } from './dispositivos.service';
export declare class DispositivosResolver {
    private readonly service;
    constructor(service: DispositivosService);
    dispositivos(): {
        id: string;
        nombre: string;
        tipo: string;
    }[];
    dispositivo(id: string): {
        id: string;
        nombre: string;
        tipo: string;
    } | undefined;
}
