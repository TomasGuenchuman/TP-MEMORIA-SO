import Particion from "../particion";
import Tarea from "../tarea";
export default abstract class Estrategia {
    abstract seleccionarParticion(particiones: Particion[], tarea: Tarea): Particion | null;
}
//# sourceMappingURL=estrategia.d.ts.map