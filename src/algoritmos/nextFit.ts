import Estrategia from "./estrategia";
import Particion from "../particion";
import Tarea from "../tarea";
import {agregarLog} from "../index";

export default class NextFit extends Estrategia {
    private ultimaAsignacion: number = 0;

    seleccionarParticion(particiones: Particion[], tarea: Tarea): Particion | null {
        agregarLog("==========================================");
        agregarLog("Utilizacion Next Fit");
        agregarLog("-  Ultima asignacion: " + this.ultimaAsignacion);
        let i: number = 0;
        let j: number = this.ultimaAsignacion;

        do {
            
            const particion: Particion | undefined = particiones[j];
    
            if (
                particion!.getLibre() && 
                ( particion!.getTamanio() >= tarea.getMemoria_requerida() )
            ) {     
                agregarLog("Se encontro una particion despues de recorrer " + i + " particiones");
                agregarLog("==========================================");
                this.ultimaAsignacion = j;
                return particion!;
            }
            i += 1;
            j = (j + 1) % particiones.length;
    
        } while (j !== this.ultimaAsignacion);  

        agregarLog("==========================================");
        return null;
    }
  }
  