import Tarea from "./tarea";
export default class Particion {
    private libre;
    private tamanio;
    private tarea;
    private inicio_particion;
    private fin_particion;
    private finTarea;
    private liberacion;
    constructor(tamanio: number, inicio_particion: number, fin_particion: number, libre?: boolean, tarea?: Tarea | null, liberacion?: boolean);
    asignarTarea(tarea: Tarea): void;
    getFinTarea(): number;
    finalizarTarea(): void;
    getLibre(): boolean;
    getParticion(): Particion;
    getTamanio(): number;
    getInicio(): number;
    getFin(): number;
    getTarea(): Tarea;
    getLiberacion(): boolean;
    setLiberacion(x: boolean): void;
    setInicio(x: number): void;
    setFin(x: number): void;
    setTamanio(x: number): void;
    setLibre(x: boolean): void;
    sumarFinTarea(x: number): void;
    toString(): string;
}
//# sourceMappingURL=particion.d.ts.map