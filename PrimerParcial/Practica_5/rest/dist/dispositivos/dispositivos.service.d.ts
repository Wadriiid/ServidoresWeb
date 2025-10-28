export declare class DispositivosService {
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
