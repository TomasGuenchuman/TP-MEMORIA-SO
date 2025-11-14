import Estrategia from "./algoritmos/estrategia";
import Particion from "./particion";
import Tarea from "./tarea";
export default class Memoria {
    private tamanio;
    private particiones;
    private tareasPendientes;
    private totalLibre;
    private estrategia;
    private tanda;
    private colaEspera;
    private fragmentacion;
    private tiempoRetorno;
    private tiempoMedioRetorno;
    private resumen;
    constructor(tamanio: number, estrategia?: Estrategia);
    agregarTarea(nuevaTarea: Tarea): void;
    crearParticion(particion: Particion, tarea: Tarea): void;
    espacioDisponible(tarea: Tarea): boolean;
    fusionarParticionesContiguas(): void;
    finalizarTareas(): void;
    calcularFragmentacion(): void;
    calculoTiempoRetorno(): void;
    getResumen(): void;
    getTotalLibre(): number;
    getFragmentacion(): number;
    hayTareasPendiente(): boolean;
}
//# sourceMappingURL=memoria.d.ts.map