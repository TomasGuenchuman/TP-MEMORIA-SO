export default class Tarea {
    private nombre;
    private tiempo_arribo;
    private duracion;
    private memoria_requerida;
    constructor(nombre: string, tiempo_arribo: number, duracion: number, memoria_requerida: number, log?: boolean);
    getNombre(): string;
    getMemoria_requerida(): number;
    getDuracion(): number;
    getTiempoArribo(): number;
    clone(): Tarea;
    toString(): string;
}
//# sourceMappingURL=tarea.d.ts.map