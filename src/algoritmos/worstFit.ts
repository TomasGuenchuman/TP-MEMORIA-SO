import Estrategia from "./estrategia";
import Particion from "../particion";
import Tarea from "../tarea";
import { agregarLog } from "../index";

export default class WorstFit extends Estrategia {
  
    seleccionarParticion(particiones: Particion[], tarea: Tarea): Particion | null {
        agregarLog("==========================================");
        agregarLog("Utilizacion Best Fit");
        let mejor: Particion | null = null;

        for (const particion of particiones) {
          if (
            particion.getLibre() &&
            particion.getTamanio() >= tarea.getMemoria_requerida()
          ) {
            if (mejor === null) {
              mejor = particion;
              agregarLog("-  mejor particion: " + `[ ${mejor.getInicio()} , ${mejor.getFin()} ]`);
            } else {
              if (particion.getTamanio() > mejor.getTamanio()) {
                mejor = particion;
                agregarLog("-  mejor particion: " + `[ ${mejor.getInicio()} , ${mejor.getFin()} ]`);
              }
            }
          }
        }
      
        agregarLog("==========================================");

        return mejor;
    }
}
  