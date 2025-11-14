import Tarea from "./tarea";
export default class Tanda {
    private static instance;
    private cola;
    private totalTareas;
    private listos;
    private constructor();
    agregarTanda(items: Tarea[]): void;
    static getInstance(): Tanda;
    hayTareas(): boolean;
    getTotalTarea(): number;
    TandaTerminada(): boolean;
    ObtenerTarea(): Tarea | null;
    agregar(item: Tarea): void;
    toString(): string;
    listosToString(): string;
}
//# sourceMappingURL=tanda.d.ts.map