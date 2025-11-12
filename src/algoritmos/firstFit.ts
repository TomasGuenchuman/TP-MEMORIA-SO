import Estrategia from "./estrategia";
import Particion from "../particion";
import Tarea from "../tarea";
import { agregarLog } from "../index";

export default class FirstFit extends Estrategia {
  
    seleccionarParticion(particiones: Particion[], tarea: Tarea): Particion | null {
        agregarLog("==========================================");
        agregarLog("Utilizacion First Fit");
        let i: number = 0;
        for (const particion of particiones) {  
          i += 1;
          agregarLog(`Particion: [ ${particion.getInicio()} , ${particion.getFin()} ] - Libre: ${particion.getLibre()} - tamaño: ${particion.getTamanio()}`);
          if (
                particion.getLibre() && 
                ( particion.getTamanio() >= tarea.getMemoria_requerida() )
            ) {
              agregarLog("Se encontro una particion despues de recorrer " + i + " particiones");
              agregarLog("==========================================");
              return particion;
            }
          }
        agregarLog("==========================================");
        return null;
    }
  }
  