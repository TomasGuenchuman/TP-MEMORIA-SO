import Estrategia from "./estrategia";
import Particion from "../particion";
import Tarea from "../tarea";
export default class NextFit extends Estrategia {
    private inicioUltimaAsignacion;
    private finUltimaAsignacion;
    private ultimaAsignacion;
    seleccionarParticion(particiones: Particion[], tarea: Tarea): Particion | null;
    buscarParticion(particiones: Particion[], tarea: Tarea): Particion | undefined;
}
//# sourceMappingURL=nextFit.d.ts.map